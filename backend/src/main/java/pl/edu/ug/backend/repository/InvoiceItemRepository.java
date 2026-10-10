package pl.edu.ug.backend.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.ug.backend.entity.InvoiceItem;

import java.util.List;

public interface InvoiceItemRepository extends JpaRepository<InvoiceItem, Long> {
    List<InvoiceItem> findByNameContainingIgnoreCase(
        String name,
        Sort sort
    );
}
