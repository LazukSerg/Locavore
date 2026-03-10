package ru.lazukserg.locavore.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.mapper.UserMapper;
import ru.lazukserg.locavore.models.ERole;
import ru.lazukserg.locavore.models.User;
import ru.lazukserg.locavore.models.pl.BuyerDTO;
import ru.lazukserg.locavore.models.pl.SellerDTO;
import ru.lazukserg.locavore.repository.BuyerRepository;
import ru.lazukserg.locavore.repository.SellerRepository;
import ru.lazukserg.locavore.repository.UserRepository;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  BuyerRepository buyerRepository;

  @Autowired
  SellerRepository sellerRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserMapper userMapper;

  @GetMapping("/{id}")
  public BuyerDTO getBuyer(@PathVariable("id") Long id) {
      return buyerRepository.findById(id).stream()
              .map(user -> userMapper.toPl(user)).findFirst().orElseThrow(() -> new EntityNotFoundException(
            String.format("Пользователь с id %d не найден", id)
    ));
  }

  @GetMapping("/seller/{id}")
  public SellerDTO getSeller(@PathVariable("id") Long id) {
    return sellerRepository.findById(id).stream()
            .map(user -> userMapper.toPl(user)).findFirst().orElseThrow(() -> new EntityNotFoundException(
                    String.format("Пользователь с id %d не найден", id)
            ));
  }

  @GetMapping("/all-seller")
  public List<SellerDTO> getAllSeller() {
    return sellerRepository.findAll().stream().map(it -> userMapper.toPl(it)).toList();
  }

  @GetMapping("/all-seller/active")
  public List<SellerDTO> getAllSellerActive() {
    return sellerRepository.findAll().stream().filter(User::isActive).map(it -> userMapper.toPl(it)).toList();
  }



  @GetMapping("/all-buyer")
  public List<BuyerDTO> getAllBuyer() {
    return buyerRepository.findAll().stream()
            .filter(it -> it.getRole().getName() == ERole.ROLE_BUYER)
            .map(it -> userMapper.toPl(it))
            .toList();
  }

  @PutMapping("/block/{id}")
  public ResponseEntity<Long> blockUser(@PathVariable("id") Long id, @RequestParam("active") boolean active) {
    var user = userRepository.getById(id);
    user.setActive(active);
    var updatedUser = userRepository.save(user);
    return ResponseEntity.ok(updatedUser.getId());
  }
}
