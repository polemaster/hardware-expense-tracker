package pl.edu.ug.backend.dto.mapper;

import org.springframework.stereotype.Component;
import pl.edu.ug.backend.dto.InvoiceResponse;
import pl.edu.ug.backend.entity.Invoice;

import java.util.function.Function;



@Component
public class InvoiceToResponseMapper implements Function<Invoice, InvoiceResponse> {
    private final InvoiceItemToResponseMapper invoiceItemToResponseMapper;

    public InvoiceToResponseMapper(InvoiceItemToResponseMapper invoiceItemToResponseMapper) {
        this.invoiceItemToResponseMapper = invoiceItemToResponseMapper;
    }

    @Override
    public InvoiceResponse apply(Invoice invoice) {
        return new InvoiceResponse(
            invoice.getId(),
            invoice.getTitle(),
            invoice.getCreationDate(),
            invoice.getItems().stream().map(invoiceItemToResponseMapper).toList()
        );
    }
}
