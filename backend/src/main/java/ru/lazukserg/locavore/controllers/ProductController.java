package ru.lazukserg.locavore.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.mapper.ProductMapper;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.models.pl.ProductDTO;
import ru.lazukserg.locavore.repository.ProductRepository;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {

  @Autowired
  ProductRepository productRepository;

  @Autowired
  ProductMapper productMapper;

  @GetMapping("/all-by-seller/{id}")
  public List<ProductDTO> allProductsBySeller(@PathVariable("id") Long id) {
    List<Product> products = productRepository.findBySellerId(id);
    return products.stream().map(product -> productMapper.toPl(product)).toList();
  }

  @GetMapping("/{id}")
  public ProductDTO getProductById(@PathVariable("id") Long id) {
    return productRepository.findById(id)
            .map(productMapper::toPl)
            .orElseThrow(() -> new EntityNotFoundException("Товар с id " + id + " не найден"));
  }

}
