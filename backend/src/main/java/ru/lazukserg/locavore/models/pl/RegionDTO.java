package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Builder;
import lombok.Data;
import ru.lazukserg.locavore.models.ERegion;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegionDTO {

    private Integer id;
    private String name;
}
