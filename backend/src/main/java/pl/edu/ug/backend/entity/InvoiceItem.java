package pl.edu.ug.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nazwa")
    private String name;
    @Column(name = "data_ksiegowania")
    private LocalDate postingDate;
    @Column(name = "koszt_USD")
    private BigDecimal costUSD;
    @Column(name = "koszt_PLN")
    private BigDecimal costPLN;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    public InvoiceItem(String name, LocalDate postingDate, BigDecimal costUSD) {
        this.name = name;
        this.postingDate = postingDate;
        this.costUSD = costUSD;
    }
}
