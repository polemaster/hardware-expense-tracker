package pl.edu.ug.backend.dto.invoice_item;


import org.springframework.stereotype.Component;
import pl.edu.ug.backend.entity.InvoiceItem;

import java.util.function.Function;

@Component
public class InvoiceItemToResponseMapper
    implements Function<InvoiceItem, InvoiceItemResponse> {

    @Override
    public InvoiceItemResponse apply(InvoiceItem item) {
        return new InvoiceItemResponse(
            item.getName(),
            item.getPostingDate(),
            item.getCostUSD(),
            item.getCostPLN(),
            item.getInvoice().getId()
        );
    }
}
