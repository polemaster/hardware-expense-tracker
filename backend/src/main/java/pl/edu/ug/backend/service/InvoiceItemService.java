package pl.edu.ug.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemResponse;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemToResponseMapper;
import pl.edu.ug.backend.repository.InvoiceItemRepository;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InvoiceItemService {
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("name", "postingDate");
    private final InvoiceItemRepository invoiceItemRepository;
    private final InvoiceItemToResponseMapper invoiceItemToResponseMapper;


    public List<InvoiceItemResponse> searchAllItems(String name, String sortBy, Sort.Direction direction) {
        if (!ALLOWED_SORT_FIELDS.contains(sortBy))
            throw new IllegalArgumentException("Invalid sort field. Allowed fields: name, postingDate");

        Sort sort = Sort.by(direction, sortBy);

        if (name == null || name.isBlank())
            return invoiceItemRepository.findAll(sort).stream().map(invoiceItemToResponseMapper).toList();

        return invoiceItemRepository.findByNameContainingIgnoreCase(name.trim(), sort)
            .stream()
            .map(invoiceItemToResponseMapper)
            .toList();
    }
}
