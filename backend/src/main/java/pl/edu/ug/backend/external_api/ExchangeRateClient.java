package pl.edu.ug.backend.external_api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;
import pl.edu.ug.backend.util.ExchangeRateApiException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;

@Component
public class ExchangeRateClient {

    private final RestClient restClient;

    public ExchangeRateClient(
        RestClient.Builder builder,
        @Value("${exchange-rate.api.base-url}") String baseUrl) {
        this.restClient = builder.baseUrl(baseUrl).build();
    }

    public BigDecimal getPLNRate(String currency, LocalDate date) {
        ExchangeRateResponse response;

        try {
            // First, try the exact requested date.
            response = restClient.get()
                .uri(uriBuilder -> uriBuilder
                    .path("/api/exchangerates/rates/{table}/{currency_code}/{date}/")
                    .build("A", currency, date))
                .retrieve()
                .body(ExchangeRateResponse.class);

        } catch (RestClientResponseException e) {
            // Only fall back when the requested date returns 404.
            if (e.getStatusCode().value() != 404) {
                throw new ExchangeRateApiException(
                    "Exchange-rate API returned HTTP "
                        + e.getStatusCode().value(),
                    e
                );
            }

            // Search the previous month through the requested date.
            try {
                response = restClient.get()
                    .uri(uriBuilder -> uriBuilder
                        .path("/api/exchangerates/rates/{table}/{currency_code}/{startDate}/{endDate}/")
                        .build("A", currency, date.minusMonths(1), date))
                    .retrieve()
                    .body(ExchangeRateResponse.class);

            } catch (RestClientResponseException | ResourceAccessException fallbackError) {
                throw new ExchangeRateApiException(
                    "Could not retrieve an exchange rate for "
                        + currency + " on or before " + date,
                    fallbackError
                );
            }

        } catch (ResourceAccessException e) {
            throw new ExchangeRateApiException(
                "Could not connect to exchange-rate API",
                e
            );
        }

        // Validate the response.
        if (response == null
            || response.rates() == null
            || response.rates().isEmpty()) {
            throw new ExchangeRateApiException(
                "API returned no exchange rates",
                null
            );
        }

        // Choose the latest available rate on or before the requested date.
        ExchangeRateResponse.Rate latestRate = response.rates().stream()
            .filter(rate -> rate.effectiveDate() != null)
            .max(Comparator.comparing(
                ExchangeRateResponse.Rate::effectiveDate
            ))
            .orElseThrow(() -> new ExchangeRateApiException(
                "API returned no valid exchange-rate dates",
                null
            ));

        BigDecimal rate = latestRate.mid();

        if (rate == null || rate.signum() <= 0) {
            throw new ExchangeRateApiException(
                "API returned an invalid exchange rate",
                null
            );
        }

        return rate;
    }
}
