package pl.edu.ug.backend.dto.invoice;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemRequest;

import java.time.LocalDate;
import java.util.List;

public record InvoiceCreationRequest(
    @NotBlank
    @Size(max = 200)
    String title,

    @NotNull
    LocalDate creationDate,

    @NotEmpty
    List<@Valid InvoiceItemRequest> items
) {}
