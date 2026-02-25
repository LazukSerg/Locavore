package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import ru.lazukserg.locavore.models.Reservation;

import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BuyerDTO {

    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private List<ReservationDTO> reservations;
}
