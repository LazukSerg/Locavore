package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryDTO {

    private Long id;
    private String name;
    private String image;
}
