package pl.edu.ug.backend.external_api;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

//public record ExchangeRateResponse(
//    String base,
//    LocalDate date,
//    Map<String, BigDecimal> rates
//) {}

public record ExchangeRateResponse(
    List<Rate> rates
) {
    public record Rate(
        LocalDate effectiveDate,
        BigDecimal mid
    ) {}
}
