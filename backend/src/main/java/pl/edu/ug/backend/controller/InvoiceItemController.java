package pl.edu.ug.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemResponse;
import pl.edu.ug.backend.service.InvoiceItemService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invoice-items")
public class InvoiceItemController {
    private final InvoiceItemService invoiceItemService;


    @GetMapping
    public List<InvoiceItemResponse> searchInvoiceItems(
        @RequestParam(required = false) String name,
        @RequestParam(defaultValue = "name") String sortBy,
        @RequestParam(defaultValue = "ASC") Sort.Direction direction)
    {
        return this.invoiceItemService.searchAllItems(name, sortBy, direction);
    }
}
