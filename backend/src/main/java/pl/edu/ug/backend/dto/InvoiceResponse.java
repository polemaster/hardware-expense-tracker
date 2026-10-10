package pl.edu.ug.backend.dto;

import java.time.LocalDate;
import java.util.List;

public record InvoiceResponse(Long id, String title, LocalDate creationDate, List<InvoiceItemResponse> items) {
}
