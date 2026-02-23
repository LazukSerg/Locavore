package ru.lazukserg.locavore.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.mapper.UserMapper;
import ru.lazukserg.locavore.models.Buyer;
import ru.lazukserg.locavore.models.Seller;
import ru.lazukserg.locavore.models.User;
import ru.lazukserg.locavore.models.pl.SellerDTO;
import ru.lazukserg.locavore.models.pl.UserDTO;
import ru.lazukserg.locavore.repository.SellerRepository;
import ru.lazukserg.locavore.repository.UserRepository;

import java.util.List;

import static ru.lazukserg.locavore.models.ERole.ROLE_BUYER;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  UserRepository userRepository;

  @Autowired
  SellerRepository sellerRepository;

  @Autowired
  UserMapper userMapper;

  @GetMapping("/{id}")
  public UserDTO getUser(@PathVariable("id") Long id) {
      return userRepository.findById(id).stream()
              .map(user -> userMapper.toPl(user)).findFirst().orElseThrow(() -> new EntityNotFoundException(
            String.format("Пользователя с id %d не найден", id)
    ));
  }

  @GetMapping("/all-seller")
  public List<SellerDTO> getAllSeller() {
    return sellerRepository.findAll().stream().map(it -> userMapper.toPl(it)).toList();
  }
}
