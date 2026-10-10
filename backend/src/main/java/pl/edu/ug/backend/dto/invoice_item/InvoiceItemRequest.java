package pl.edu.ug.backend.dto.invoice_item;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDate;

public record InvoiceItemRequest(
    @NotBlank
    @Size(max = 200)
    String name,

    @NotNull
    @PastOrPresent
    LocalDate postingDate,

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    BigDecimal costUSD
) {}
