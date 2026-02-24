package ru.lazukserg.locavore.mapper;

import org.springframework.stereotype.Component;
import ru.lazukserg.locavore.models.Reservation;
import ru.lazukserg.locavore.models.pl.ReservationDTO;

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
                .buyerId(reservation.getBuyerId())
                .sellerId(reservation.getSeller().getId())
                .sellerUserName(reservation.getSeller().getUsername())
                .build();
    }

}
