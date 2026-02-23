package ru.lazukserg.locavore.models.pl;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import ru.lazukserg.locavore.models.pl.CategoryDTO;
import ru.lazukserg.locavore.models.pl.RegionDTO;
import ru.lazukserg.locavore.models.pl.SellerDTO;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDTO {

    private Long id;
    private String title;
    private String image;
    private String structure;
    private String description;
    private int price;
    private SellerDTO seller;
    private CategoryDTO category;
    private RegionDTO region;
    private boolean local;
}
