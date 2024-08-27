package ru.lazukserg.locavore.repository;

import ru.lazukserg.locavore.models.Category;
import ru.lazukserg.locavore.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  List<Product> findAllByCategoryId(Long id);
}
