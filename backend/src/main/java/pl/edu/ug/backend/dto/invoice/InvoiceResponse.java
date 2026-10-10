package pl.edu.ug.backend.dto.invoice;

import pl.edu.ug.backend.dto.invoice_item.InvoiceItemResponse;

import java.time.LocalDate;
import java.util.List;

public record InvoiceResponse(Long id, String title, LocalDate creationDate, List<InvoiceItemResponse> items) {
}
