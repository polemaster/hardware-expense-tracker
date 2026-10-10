package pl.edu.ug.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record InvoiceItemResponse(
    String name, LocalDate postingDate,
    BigDecimal costUSD, BigDecimal costPLN, Long invoiceId) {
}
