package pl.edu.ug.backend.service;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import org.springframework.stereotype.Service;
import pl.edu.ug.backend.entity.Invoice;
import pl.edu.ug.backend.util.InvoiceXmlExportException;

import java.io.File;

@Service
public class InvoiceXmlService {

    private final JAXBContext jaxbContext;

    public InvoiceXmlService() {
        try {
            this.jaxbContext = JAXBContext.newInstance(Invoice.class);
        } catch (JAXBException e) {
            throw new IllegalStateException("Failed to initialize JAXBContext for Invoice", e);
        }
    }

    public void saveInvoiceToXml(Invoice invoice) {
        try {
            Marshaller marshaller = jaxbContext.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            File file = new File("faktura_" + invoice.getId() + ".xml");
            marshaller.marshal(invoice, file);
        } catch (JAXBException e) {
            throw new InvoiceXmlExportException("Failed to save invoice to XML", e);
        }
    }
}
