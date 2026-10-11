package pl.edu.ug.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemResponse;
import pl.edu.ug.backend.service.InvoiceItemService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(InvoiceItemController.class)
class InvoiceItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private InvoiceItemService invoiceItemService;

    @Test
    void searchInvoiceItems_withoutParams_callsServiceWithDefaults() throws Exception {
        when(invoiceItemService.searchAllItems(null, null, "name", Sort.Direction.ASC))
            .thenReturn(List.of(
                new InvoiceItemResponse("Mouse", LocalDate.of(2026, 1, 10), BigDecimal.valueOf(25), BigDecimal.valueOf(100), 1L)
            ));

        mockMvc.perform(get("/invoice-items"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].name").value("Mouse"))
            .andExpect(jsonPath("$[0].postingDate").value("2026-01-10"))
            .andExpect(jsonPath("$[0].costUSD").value(25))
            .andExpect(jsonPath("$[0].invoiceId").value(1));

        verify(invoiceItemService).searchAllItems(null, null, "name", Sort.Direction.ASC);
    }

    @Test
    void searchInvoiceItems_withPostingDateAndName_callsServiceWithParsedDate() throws Exception {
        LocalDate date = LocalDate.of(2026, 3, 15);
        when(invoiceItemService.searchAllItems("Keyboard", date, "postingDate", Sort.Direction.DESC))
            .thenReturn(List.of(
                new InvoiceItemResponse("Keyboard", date, BigDecimal.valueOf(75), BigDecimal.valueOf(300), 2L)
            ));

        mockMvc.perform(get("/invoice-items")
                .param("name", "Keyboard")
                .param("postingDate", "2026-03-15")
                .param("sortBy", "postingDate")
                .param("direction", "DESC"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].name").value("Keyboard"))
            .andExpect(jsonPath("$[0].postingDate").value("2026-03-15"));

        verify(invoiceItemService).searchAllItems("Keyboard", date, "postingDate", Sort.Direction.DESC);
    }

    @Test
    void searchInvoiceItems_withPostingDateOnly_callsServiceWithParsedDate() throws Exception {
        LocalDate date = LocalDate.of(2026, 3, 15);
        when(invoiceItemService.searchAllItems(null, date, "name", Sort.Direction.ASC))
            .thenReturn(List.of(
                new InvoiceItemResponse("Keyboard", date, BigDecimal.valueOf(75), BigDecimal.valueOf(300), 2L)
            ));

        mockMvc.perform(get("/invoice-items")
                .param("postingDate", "2026-03-15"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].name").value("Keyboard"))
            .andExpect(jsonPath("$[0].postingDate").value("2026-03-15"));

        verify(invoiceItemService).searchAllItems(null, date, "name", Sort.Direction.ASC);
    }

    @Test
    void searchInvoiceItems_withEmptyPostingDate_treatedAsNull() throws Exception {
        when(invoiceItemService.searchAllItems(null, null, "name", Sort.Direction.ASC))
            .thenReturn(List.of());

        mockMvc.perform(get("/invoice-items")
                .param("postingDate", ""))
            .andExpect(status().isOk());

        verify(invoiceItemService).searchAllItems(null, null, "name", Sort.Direction.ASC);
    }
}
