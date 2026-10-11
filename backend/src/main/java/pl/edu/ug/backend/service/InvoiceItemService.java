package pl.edu.ug.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemResponse;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemToResponseMapper;
import pl.edu.ug.backend.entity.InvoiceItem;
import pl.edu.ug.backend.repository.InvoiceItemRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InvoiceItemService {
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("name", "postingDate");
    private final InvoiceItemRepository invoiceItemRepository;
    private final InvoiceItemToResponseMapper invoiceItemToResponseMapper;


    public List<InvoiceItemResponse> searchAllItems(String name, String sortBy, Sort.Direction direction) {
        return searchAllItems(name, null, sortBy, direction);
    }

    public List<InvoiceItemResponse> searchAllItems(String name, LocalDate postingDate, String sortBy, Sort.Direction direction) {
        if (!ALLOWED_SORT_FIELDS.contains(sortBy))
            throw new IllegalArgumentException("Invalid sort field. Allowed fields: name, postingDate");

        Sort sort = Sort.by(direction, sortBy);
        boolean hasName = name != null && !name.isBlank();
        boolean hasDate = postingDate != null;

        List<InvoiceItem> items;
        if (hasName && hasDate) {
            items = invoiceItemRepository.findByNameContainingIgnoreCaseAndPostingDate(name.trim(), postingDate, sort);
        } else if (hasName) {
            items = invoiceItemRepository.findByNameContainingIgnoreCase(name.trim(), sort);
        } else if (hasDate) {
            items = invoiceItemRepository.findByPostingDate(postingDate, sort);
        } else {
            items = invoiceItemRepository.findAll(sort);
        }

        return items.stream()
            .map(invoiceItemToResponseMapper)
            .toList();
    }
}
