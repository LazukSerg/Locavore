package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.With;

import java.util.List;
import java.util.Map;

@Data
@Builder
@With
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReservationDTO {

    private Long id;
    private String dateOfCreation;
    private String dateOfPickUp;
    private int countPosition;
    private int totalOrder;
    private String status;
    private Long buyerId;
    private Long sellerId;
    private String sellerUserName;
    private String buyerUserName;
    private SellerDTO seller;
    private BuyerDTO buyer;
    private List<ProductDTO> products;

}
