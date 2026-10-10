package pl.edu.ug.backend.service;

import org.springframework.stereotype.Service;
import pl.edu.ug.backend.entity.Invoice;
import pl.edu.ug.backend.repository.InvoiceRepository;

import java.util.List;

@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public List<Invoice> getAll() {
        return invoiceRepository.findAll();
    }

    public Invoice create() {
        Invoice invoice = new Invoice("First invoice");
        return invoiceRepository.save(invoice);
    }

}
