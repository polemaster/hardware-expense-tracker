package pl.edu.ug.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.backend.entity.Invoice;
import pl.edu.ug.backend.service.InvoiceService;

import java.util.List;

@RestController
@RequestMapping("/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Invoice> getInvoices() {
        return invoiceService.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Invoice createInvoice() {
        return invoiceService.create();
    }

}
