package pl.edu.ug.backend.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.data.domain.Sort;
import pl.edu.ug.backend.entity.Invoice;
import pl.edu.ug.backend.entity.InvoiceItem;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class InvoiceItemRepositoryTest {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceItemRepository invoiceItemRepository;

    private Invoice invoice;

    @BeforeEach
    void setUp() {
        invoice = new Invoice("Test Invoice", LocalDate.of(2026, 1, 1));
        invoiceRepository.save(invoice);

        InvoiceItem item1 = new InvoiceItem("Monitor Dell", LocalDate.of(2026, 1, 10), BigDecimal.valueOf(300), BigDecimal.valueOf(1200));
        item1.setInvoice(invoice);

        InvoiceItem item2 = new InvoiceItem("Monitor LG", LocalDate.of(2026, 2, 15), BigDecimal.valueOf(250), BigDecimal.valueOf(1000));
        item2.setInvoice(invoice);

        InvoiceItem item3 = new InvoiceItem("Mechanical Keyboard", LocalDate.of(2026, 1, 10), BigDecimal.valueOf(100), BigDecimal.valueOf(400));
        item3.setInvoice(invoice);

        invoiceItemRepository.saveAll(List.of(item1, item2, item3));
    }

    @Test
    void findByNameContainingIgnoreCase_shouldFilterByName() {
        List<InvoiceItem> result = invoiceItemRepository.findByNameContainingIgnoreCase("monitor", Sort.by(Sort.Direction.ASC, "name"));
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Monitor Dell");
        assertThat(result.get(1).getName()).isEqualTo("Monitor LG");
    }

    @Test
    void findByPostingDate_shouldFilterByDate() {
        List<InvoiceItem> result = invoiceItemRepository.findByPostingDate(LocalDate.of(2026, 1, 10), Sort.by(Sort.Direction.ASC, "name"));
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getName()).isEqualTo("Mechanical Keyboard");
        assertThat(result.get(1).getName()).isEqualTo("Monitor Dell");
    }

    @Test
    void findByNameContainingIgnoreCaseAndPostingDate_shouldFilterByBoth() {
        List<InvoiceItem> result = invoiceItemRepository.findByNameContainingIgnoreCaseAndPostingDate(
            "monitor",
            LocalDate.of(2026, 1, 10),
            Sort.by(Sort.Direction.ASC, "name")
        );
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Monitor Dell");
    }
}
