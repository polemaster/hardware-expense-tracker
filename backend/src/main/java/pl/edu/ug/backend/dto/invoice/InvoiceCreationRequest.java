package pl.edu.ug.backend.dto.invoice;

import pl.edu.ug.backend.dto.invoice_item.InvoiceItemRequest;

import java.time.LocalDate;
import java.util.List;

public record InvoiceCreationRequest(String title, LocalDate creationDate, List<InvoiceItemRequest> items) {
}
