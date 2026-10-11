package pl.edu.ug.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemResponse;
import pl.edu.ug.backend.service.InvoiceItemService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invoice-items")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceItemController {
    private final InvoiceItemService invoiceItemService;


    @GetMapping
    public List<InvoiceItemResponse> searchInvoiceItems(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate postingDate,
        @RequestParam(defaultValue = "name") String sortBy,
        @RequestParam(defaultValue = "ASC") Sort.Direction direction)
    {
        return this.invoiceItemService.searchAllItems(name, postingDate, sortBy, direction);
    }
}
