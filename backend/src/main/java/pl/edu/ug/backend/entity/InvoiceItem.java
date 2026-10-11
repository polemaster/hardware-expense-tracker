package pl.edu.ug.backend.entity;

import jakarta.persistence.*;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlTransient;
import jakarta.xml.bind.annotation.XmlType;
import jakarta.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.ug.backend.util.LocalDateAdapter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(propOrder = {"name", "postingDate", "costUSD", "costPLN"})
public class InvoiceItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @XmlTransient
    private Long id;

    @XmlElement(name = "nazwa")
    @Column(name = "nazwa")
    private String name;

    @XmlElement(name = "data_ksiegowania")
    @XmlJavaTypeAdapter(LocalDateAdapter.class)
    @Column(name = "data_ksiegowania")
    private LocalDate postingDate;

    @XmlElement(name = "koszt_USD")
    @Column(name = "koszt_USD")
    private BigDecimal costUSD;

    @XmlElement(name = "koszt_PLN")
    @Column(name = "koszt_PLN")
    private BigDecimal costPLN;

    @XmlTransient
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    public InvoiceItem(String name, LocalDate postingDate, BigDecimal costUSD, BigDecimal costPLN) {
        this.name = name;
        this.postingDate = postingDate;
        this.costUSD = costUSD;
        this.costPLN = costPLN;
    }
}
