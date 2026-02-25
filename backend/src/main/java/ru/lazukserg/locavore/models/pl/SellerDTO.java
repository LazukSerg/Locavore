package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;
import ru.lazukserg.locavore.models.pl.ProductDTO;
import ru.lazukserg.locavore.models.pl.RegionDTO;
import ru.lazukserg.locavore.models.pl.ReservationDTO;

import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SellerDTO {

    private Long id;
    private String username;
    private String email;
    private String phoneNumber;
    private RegionDTO region;
    private String city;
    private String street;
    private String building;
    private String firstName;
    private String lastName;
    private List<ProductDTO> products;
    private List<CategoryDTO> categories;
    private List<ReservationDTO> reservations;
}
