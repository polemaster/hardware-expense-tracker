package pl.edu.ug.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.ug.backend.dto.invoice.InvoiceCreationRequest;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemRequest;
import pl.edu.ug.backend.dto.invoice.InvoiceResponse;
import pl.edu.ug.backend.dto.invoice.InvoiceToResponseMapper;
import pl.edu.ug.backend.entity.Invoice;
import pl.edu.ug.backend.entity.InvoiceItem;
import pl.edu.ug.backend.external_api.ExchangeRateClient;
import pl.edu.ug.backend.external_api.ExchangeRateResponse;
import pl.edu.ug.backend.repository.InvoiceRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceToResponseMapper invoiceToResponseMapper;
    private final ExchangeRateClient exchangeRateClient;

    public List<InvoiceResponse> getAll() {
        return invoiceRepository.findAll()
            .stream()
            .map(invoiceToResponseMapper)
            .toList();
    }

    public InvoiceResponse create(InvoiceCreationRequest request) {
        Invoice invoice = new Invoice(
            request.title(),
            request.creationDate()
        );

        for (InvoiceItemRequest itemRequest : request.items()) {
            LocalDate postingDate = itemRequest.postingDate();
            BigDecimal rate = exchangeRateClient.getPLNRate("USD", postingDate);
            BigDecimal costUSD = itemRequest.costUSD();
            BigDecimal costPLN = costUSD.multiply(rate).setScale(2, RoundingMode.HALF_UP);

            InvoiceItem item = new InvoiceItem(
                itemRequest.name(),
                postingDate,
                costUSD,
                costPLN
            );

            invoice.addItem(item);
        }

        return invoiceToResponseMapper.apply(invoiceRepository.save(invoice));
    }

}
