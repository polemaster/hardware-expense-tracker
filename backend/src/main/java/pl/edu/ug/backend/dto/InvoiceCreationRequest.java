package pl.edu.ug.backend.dto;

import java.time.LocalDate;
import java.util.List;

public record InvoiceCreationRequest(String title, LocalDate creationDate, List<InvoiceItemRequest> items) {
}
