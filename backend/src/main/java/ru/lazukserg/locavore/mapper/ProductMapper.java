package ru.lazukserg.locavore.mapper;

import org.springframework.stereotype.Component;
import ru.lazukserg.locavore.models.Category;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.models.Region;
import ru.lazukserg.locavore.models.Seller;
import ru.lazukserg.locavore.models.pl.CategoryDTO;
import ru.lazukserg.locavore.models.pl.ProductDTO;
import ru.lazukserg.locavore.models.pl.RegionDTO;
import ru.lazukserg.locavore.models.pl.SellerDTO;

@Component
public class ProductMapper {

    public ProductDTO toPl(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .title(product.getTitle())
                .image(product.getImage())
                .structure(product.getStructure())
                .description(product.getDescription())
                .price(product.getPrice())
                .seller(SellerDTO.builder()
                        .id(product.getSeller().getId())
                        .build())
                .category(CategoryDTO.builder()
                        .id(product.getCategory().getId())
                        .name(product.getCategory().getName())
                        .build())
                .region(RegionDTO.builder()
                        .id(product.getRegion().getId())
                        .name(product.getRegion().getName().getDisplayName())
                        .build())
                .local(product.isLocal())
                .build();
    }

    public Product fromPl(ProductDTO productDTO, Seller seller, Category category, Region region) {
        return new Product(
                productDTO.getTitle(),
                productDTO.getImage(),
                productDTO.getCertificate(),
                productDTO.getStructure(),
                productDTO.getDescription(),
                productDTO.getPrice(),
                seller,
                category,
                region,
                productDTO.isLocal()
        );
    }

    public ProductDTO toPlShort(Product product, int quantity) {
        return ProductDTO.builder()
                .id(product.getId())
                .title(product.getTitle())
                .image(product.getImage())
                .price(product.getPrice())
                .quantity(quantity)
                .build();
    }
}
