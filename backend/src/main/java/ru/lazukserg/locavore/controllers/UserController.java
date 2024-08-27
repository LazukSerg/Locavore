package ru.lazukserg.locavore.controllers;

import ru.lazukserg.locavore.models.Category;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.models.User;
import ru.lazukserg.locavore.repository.CategoryRepository;
import ru.lazukserg.locavore.repository.ProductRepository;
import ru.lazukserg.locavore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @GetMapping("/{id}")
  public User getProductsByCategory(@PathVariable("id") Long id) {
    User user = userRepository.findById(id).get();
    return user;
  }
}
