package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import ru.lazukserg.locavore.models.ERole;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoleDTO {

    private ERole name;
}
