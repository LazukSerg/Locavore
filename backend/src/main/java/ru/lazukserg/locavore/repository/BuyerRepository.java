package ru.lazukserg.locavore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.lazukserg.locavore.models.Buyer;
import ru.lazukserg.locavore.models.Seller;

import java.util.List;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long> {


}
