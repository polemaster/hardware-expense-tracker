package pl.edu.ug.backend.service;

import org.springframework.stereotype.Service;
import pl.edu.ug.backend.dto.InvoiceCreationRequest;
import pl.edu.ug.backend.dto.InvoiceItemRequest;
import pl.edu.ug.backend.dto.InvoiceResponse;
import pl.edu.ug.backend.dto.mapper.InvoiceToResponseMapper;
import pl.edu.ug.backend.entity.Invoice;
import pl.edu.ug.backend.entity.InvoiceItem;
import pl.edu.ug.backend.repository.InvoiceRepository;

import java.util.List;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final InvoiceToResponseMapper invoiceToResponseMapper;

    public InvoiceService(InvoiceRepository invoiceRepository, InvoiceToResponseMapper invoiceToResponseMapper) {
        this.invoiceRepository = invoiceRepository;
        this.invoiceToResponseMapper = invoiceToResponseMapper;
    }

    public List<InvoiceResponse> getAll() {
        return invoiceRepository.findAll()
            .stream()
            .map(invoiceToResponseMapper)
            .toList();
    }

    public InvoiceResponse create(InvoiceCreationRequest request) {
        Invoice invoice = new Invoice(
            request.title(),
            request.creationDate()
        );

        for (InvoiceItemRequest itemRequest : request.items()) {
            InvoiceItem item = new InvoiceItem(
                itemRequest.name(),
                itemRequest.postingDate(),
                itemRequest.costUSD()
            );

            invoice.addItem(item);
        }

        return invoiceToResponseMapper.apply(invoiceRepository.save(invoice));
    }

}
