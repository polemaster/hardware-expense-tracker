package pl.edu.ug.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record InvoiceItemRequest(
    String name,
    LocalDate postingDate,
    BigDecimal costUSD)
{}
