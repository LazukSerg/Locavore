package ru.lazukserg.locavore.repository;

import ru.lazukserg.locavore.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findAllByCategoryId(Long id);

  List<Product> findAll();

  List<Product> findBySellerId(Long id);

  Optional<Product> findById(Long id);
}
