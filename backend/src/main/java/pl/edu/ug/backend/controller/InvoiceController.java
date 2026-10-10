package pl.edu.ug.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.backend.dto.invoice.InvoiceCreationRequest;
import pl.edu.ug.backend.dto.invoice.InvoiceResponse;
import pl.edu.ug.backend.service.InvoiceService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invoices")
public class InvoiceController {
    private final InvoiceService invoiceService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<InvoiceResponse> getInvoices() {
        return invoiceService.getAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public InvoiceResponse createInvoice(@RequestBody InvoiceCreationRequest request) {
        return invoiceService.create(request);
    }

}
