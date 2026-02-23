package ru.lazukserg.locavore.utils;

import ru.lazukserg.locavore.models.ERegion;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = false)
public class ERegionConverter implements AttributeConverter<ERegion, String> {

    @Override
    public String convertToDatabaseColumn(ERegion region) {
        if (region == null) {
            return null;
        }
        return region.getDisplayName(); // Сохраняем русское название в БД
    }

    @Override
    public ERegion convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        for (ERegion region : ERegion.values()) {
            if (region.getDisplayName().equals(dbData)) {
                return region;
            }
        }

        throw new IllegalArgumentException("Неизвестный регион: " + dbData);
    }
}
