package ru.lazukserg.locavore.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.mapper.UserMapper;
import ru.lazukserg.locavore.models.pl.BuyerDTO;
import ru.lazukserg.locavore.models.pl.SellerDTO;
import ru.lazukserg.locavore.repository.BuyerRepository;
import ru.lazukserg.locavore.repository.SellerRepository;

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
  UserMapper userMapper;

  @GetMapping("/{id}")
  public BuyerDTO getBuyer(@PathVariable("id") Long id) {
      return buyerRepository.findById(id).stream()
              .map(user -> userMapper.toPl(user)).findFirst().orElseThrow(() -> new EntityNotFoundException(
            String.format("Пользователя с id %d не найден", id)
    ));
  }

  @GetMapping("/seller/{id}")
  public SellerDTO getSeller(@PathVariable("id") Long id) {
    return sellerRepository.findById(id).stream()
            .map(user -> userMapper.toPl(user)).findFirst().orElseThrow(() -> new EntityNotFoundException(
                    String.format("Пользователя с id %d не найден", id)
            ));
  }

  @GetMapping("/all-seller")
  public List<SellerDTO> getAllSeller() {
    return sellerRepository.findAll().stream().map(it -> userMapper.toPl(it)).toList();
  }
}
