package pl.edu.ug.backend.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemResponse;
import pl.edu.ug.backend.dto.invoice_item.InvoiceItemToResponseMapper;
import pl.edu.ug.backend.entity.InvoiceItem;
import pl.edu.ug.backend.repository.InvoiceItemRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InvoiceItemServiceTest {

    @Mock
    private InvoiceItemRepository invoiceItemRepository;

    @Mock
    private InvoiceItemToResponseMapper invoiceItemToResponseMapper;

    private InvoiceItemService invoiceItemService;

    @BeforeEach
    void setUp() {
        invoiceItemService = new InvoiceItemService(invoiceItemRepository, invoiceItemToResponseMapper);
    }

    @Test
    void searchAllItems_whenNoFilters_shouldCallFindAll() {
        Sort expectedSort = Sort.by(Sort.Direction.ASC, "name");
        InvoiceItem item = new InvoiceItem("Monitor", LocalDate.of(2026, 1, 15), BigDecimal.TEN, BigDecimal.valueOf(40));
        InvoiceItemResponse response = new InvoiceItemResponse("Monitor", LocalDate.of(2026, 1, 15), BigDecimal.TEN, BigDecimal.valueOf(40), 1L);

        when(invoiceItemRepository.findAll(expectedSort)).thenReturn(List.of(item));
        when(invoiceItemToResponseMapper.apply(item)).thenReturn(response);

        List<InvoiceItemResponse> result = invoiceItemService.searchAllItems(null, null, "name", Sort.Direction.ASC);

        assertThat(result).containsExactly(response);
        verify(invoiceItemRepository).findAll(expectedSort);
    }

    @Test
    void searchAllItems_whenNameOnly_shouldCallFindByNameContainingIgnoreCase() {
        Sort expectedSort = Sort.by(Sort.Direction.DESC, "postingDate");
        InvoiceItem item = new InvoiceItem("Monitor", LocalDate.of(2026, 1, 15), BigDecimal.TEN, BigDecimal.valueOf(40));
        InvoiceItemResponse response = new InvoiceItemResponse("Monitor", LocalDate.of(2026, 1, 15), BigDecimal.TEN, BigDecimal.valueOf(40), 1L);

        when(invoiceItemRepository.findByNameContainingIgnoreCase("mon", expectedSort)).thenReturn(List.of(item));
        when(invoiceItemToResponseMapper.apply(item)).thenReturn(response);

        List<InvoiceItemResponse> result = invoiceItemService.searchAllItems("  mon  ", null, "postingDate", Sort.Direction.DESC);

        assertThat(result).containsExactly(response);
        verify(invoiceItemRepository).findByNameContainingIgnoreCase("mon", expectedSort);
    }

    @Test
    void searchAllItems_whenPostingDateOnly_shouldCallFindByPostingDate() {
        LocalDate date = LocalDate.of(2026, 2, 20);
        Sort expectedSort = Sort.by(Sort.Direction.ASC, "name");
        InvoiceItem item = new InvoiceItem("Keyboard", date, BigDecimal.TEN, BigDecimal.valueOf(40));
        InvoiceItemResponse response = new InvoiceItemResponse("Keyboard", date, BigDecimal.TEN, BigDecimal.valueOf(40), 1L);

        when(invoiceItemRepository.findByPostingDate(date, expectedSort)).thenReturn(List.of(item));
        when(invoiceItemToResponseMapper.apply(item)).thenReturn(response);

        List<InvoiceItemResponse> result = invoiceItemService.searchAllItems(null, date, "name", Sort.Direction.ASC);

        assertThat(result).containsExactly(response);
        verify(invoiceItemRepository).findByPostingDate(date, expectedSort);
    }

    @Test
    void searchAllItems_whenBothNameAndPostingDate_shouldCallFindByNameContainingIgnoreCaseAndPostingDate() {
        LocalDate date = LocalDate.of(2026, 2, 20);
        Sort expectedSort = Sort.by(Sort.Direction.ASC, "name");
        InvoiceItem item = new InvoiceItem("Keyboard", date, BigDecimal.TEN, BigDecimal.valueOf(40));
        InvoiceItemResponse response = new InvoiceItemResponse("Keyboard", date, BigDecimal.TEN, BigDecimal.valueOf(40), 1L);

        when(invoiceItemRepository.findByNameContainingIgnoreCaseAndPostingDate("key", date, expectedSort)).thenReturn(List.of(item));
        when(invoiceItemToResponseMapper.apply(item)).thenReturn(response);

        List<InvoiceItemResponse> result = invoiceItemService.searchAllItems("key", date, "name", Sort.Direction.ASC);

        assertThat(result).containsExactly(response);
        verify(invoiceItemRepository).findByNameContainingIgnoreCaseAndPostingDate("key", date, expectedSort);
    }

    @Test
    void searchAllItems_whenInvalidSortField_shouldThrowException() {
        assertThatThrownBy(() -> invoiceItemService.searchAllItems(null, null, "invalidField", Sort.Direction.ASC))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("Invalid sort field");
    }
}
