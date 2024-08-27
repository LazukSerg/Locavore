package ru.lazukserg.locavore.controllers;

import ru.lazukserg.locavore.models.Category;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.repository.CategoryRepository;
import ru.lazukserg.locavore.repository.ProductRepository;
import ru.lazukserg.locavore.repository.UserRepository;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {

  @Autowired
  CategoryRepository categoryRepository;

  @Autowired
  ProductRepository productRepository;

  @GetMapping("/all")
  public List<Category> allCategories() {
    return categoryRepository.findAll();
  }

  @GetMapping("/{id}")
  public List<Product> getProductsByCategory(@PathVariable("id") Long id) {
    return productRepository.findAllByCategoryId(id);
  }
}
