package ru.lazukserg.locavore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.lazukserg.locavore.models.Reservation;

@Repository
public interface OrderRepository extends JpaRepository<Reservation, Long> {
  Reservation save(Reservation order);
}
