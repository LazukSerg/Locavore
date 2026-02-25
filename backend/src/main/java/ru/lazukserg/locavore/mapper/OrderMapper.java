package ru.lazukserg.locavore.mapper;

import org.springframework.stereotype.Component;
import ru.lazukserg.locavore.models.Reservation;
import ru.lazukserg.locavore.models.pl.BuyerDTO;
import ru.lazukserg.locavore.models.pl.RegionDTO;
import ru.lazukserg.locavore.models.pl.ReservationDTO;
import ru.lazukserg.locavore.models.pl.SellerDTO;

@Component
public class OrderMapper {

    public ReservationDTO toPl(Reservation reservation) {
        return ReservationDTO.builder()
                .id(reservation.getId())
                .dateOfCreation(reservation.getDateOfCreation())
                .dateOfPickUp(reservation.getDateOfPickUp())
                .countPosition(reservation.getCountPosition())
                .totalOrder(reservation.getTotalOrder())
                .status(reservation.getStatus())
                .buyerId(reservation.getBuyer().getId())
                .sellerId(reservation.getSeller().getId())
                .sellerUserName(reservation.getSeller().getUsername())
                .buyerUserName(reservation.getBuyer().getUsername())
                .build();
    }

    public ReservationDTO toPlFull(Reservation reservation) {
        return ReservationDTO.builder()
                .id(reservation.getId())
                .dateOfCreation(reservation.getDateOfCreation())
                .dateOfPickUp(reservation.getDateOfPickUp())
                .totalOrder(reservation.getTotalOrder())
                .status(reservation.getStatus())
                .buyer(BuyerDTO.builder()
                        .id(reservation.getBuyer().getId())
                        .username(reservation.getBuyer().getUsername())
                        .email(reservation.getBuyer().getEmail())
                        .phoneNumber(reservation.getBuyer().getPhoneNumber())
                        .build())
                .seller(SellerDTO.builder()
                        .id(reservation.getSeller().getId())
                        .username(reservation.getSeller().getUsername())
                        .email(reservation.getSeller().getEmail())
                        .phoneNumber(reservation.getSeller().getPhoneNumber())
                        .region(RegionDTO.builder()
                                .name(reservation.getSeller().getRegion().getName().getDisplayName())
                                .build())
                        .firstName(reservation.getSeller().getFirstName())
                        .lastName(reservation.getSeller().getLastName())
                        .city(reservation.getSeller().getCity())
                        .street(reservation.getSeller().getStreet())
                        .building(reservation.getSeller().getBuilding())
                        .build())
                .build();
    }

}
