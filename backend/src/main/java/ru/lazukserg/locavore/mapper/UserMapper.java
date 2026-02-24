package ru.lazukserg.locavore.mapper;

import org.springframework.stereotype.Component;
import ru.lazukserg.locavore.models.Buyer;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.models.Seller;
import ru.lazukserg.locavore.models.User;
import ru.lazukserg.locavore.models.pl.*;

@Component
public class UserMapper {

    public SellerDTO toPl(Seller seller) {
        var sellerDto = SellerDTO.builder()
                .id(seller.getId())
                .username(seller.getUsername())
                .phoneNumber(seller.getPhoneNumber())
                .region(RegionDTO.builder()
                        .name(seller.getRegion().getName().getDisplayName())
                        .build())
                .city(seller.getCity())
                .street(seller.getStreet())
                .building(seller.getBuilding())
                .firstName(seller.getFirstName())
                .lastName(seller.getLastName())
                .products(seller.getProducts().stream()
                        .map(product -> ProductDTO.builder()
                                .id(product.getId())
                                .title(product.getTitle())
                                .category(CategoryDTO.builder()
                                        .id(product.getCategory().getId())
                                        .name(product.getCategory().getName())
                                        .build())
                                .local(product.isLocal())
                                .build())
                        .toList())
                .build();
        sellerDto.setCategories(sellerDto.getProducts().stream()
                .map(ProductDTO::getCategory)
                .distinct()
                .toList());
        return sellerDto;
    }

    public UserDTO toPl(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
}
