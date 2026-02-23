package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReservationDTO {

    private Long id;
    private String dateOfCreation;
    private String dateOfPickUp;
    private int countPosition;
    private int totalOrder;
    private Long userId;
    private Long sellerId;
}
