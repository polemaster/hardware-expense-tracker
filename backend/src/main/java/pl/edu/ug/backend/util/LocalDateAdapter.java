package pl.edu.ug.backend.util;

import jakarta.xml.bind.annotation.adapters.XmlAdapter;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class LocalDateAdapter extends XmlAdapter<String, LocalDate> {

    @Override
    public LocalDate unmarshal(String v) {
        return (v != null && !v.isBlank()) ? LocalDate.parse(v) : null;
    }

    @Override
    public String marshal(LocalDate v) {
        return v != null ? v.format(DateTimeFormatter.ISO_LOCAL_DATE) : null;
    }
}
