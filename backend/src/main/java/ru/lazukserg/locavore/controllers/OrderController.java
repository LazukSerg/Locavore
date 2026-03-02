package ru.lazukserg.locavore.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.mapper.OrderMapper;
import ru.lazukserg.locavore.mapper.ProductMapper;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.models.Reservation;
import ru.lazukserg.locavore.models.pl.ProductDTO;
import ru.lazukserg.locavore.models.pl.ReservationDTO;
import ru.lazukserg.locavore.payload.request.Order;
import ru.lazukserg.locavore.repository.BuyerRepository;
import ru.lazukserg.locavore.repository.OrderRepository;
import ru.lazukserg.locavore.repository.ProductRepository;
import ru.lazukserg.locavore.repository.SellerRepository;
import ru.lazukserg.locavore.utils.MailUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
@Slf4j
public class OrderController {

  @Autowired
  OrderRepository orderRepository;
  @Autowired
  ProductRepository productRepository;

  @Autowired
  SellerRepository sellerRepository;
  @Autowired
  BuyerRepository buyerRepository;

  @Autowired
  OrderMapper orderMapper;

  @Autowired
  ProductMapper productMapper;

  @Autowired
  MailSender  mailSender;

  @PostMapping(value = "/create")
  public Long createOrder(@RequestBody Order order) {
    var seller = sellerRepository.findById(order.getSellerId()).get();
    var buyer = buyerRepository.findById(order.getBuyerId()).get();
    var mapProducts = order.getProducts().entrySet().stream()
            .collect(Collectors.toMap(Map.Entry::getKey, (x) -> x.getValue().getCount()));
    Reservation reservation = new Reservation(
            null,
            order.getDateOfCreation(),
            order.getDateOfPickUp(),
            order.getCountPosition(),
            order.getTotalOrder(),
            order.getStatus(),
            buyer,
            seller,
            mapProducts
    );

    var result = orderRepository.save(reservation);
    SimpleMailMessage simpleMail = MailUtils.createMail(order, result.getId(), false);
    SimpleMailMessage simpleMailToAdmin = MailUtils.createMail(order, result.getId(), true);
    try {
      mailSender.send(simpleMail);
      mailSender.send(simpleMailToAdmin);
    } catch (Exception ex) {
      log.error("Ошибка отправки сообщения по электронной почте. " + ex.getMessage());
    }

    return result.getId();
  }

  @GetMapping("/all/{role}/{id}")
  public List<ReservationDTO> allOrdersByRole(@PathVariable("role") String role, @PathVariable("id") Long id) {
    List<Reservation> orders;
    if(role.equals("ROLE_BUYER")) {
      orders = orderRepository.findByBuyerId(id);
    } else {
      orders = orderRepository.findBySellerId(id);
    }
    return orders.stream().map(order -> orderMapper.toPl(order)).toList();
  }

  @GetMapping("/{id}")
  public ReservationDTO getOrderById(@PathVariable("id") Long id) {
    Reservation order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Заказ с id: " + id + " не найден"));
    List<ProductDTO> productToQuantityMap = order.getProducts().entrySet().stream()
            .map(entry -> productMapper.toPlShort(productRepository.findById(entry.getKey())
                    .orElseThrow(() -> new IllegalArgumentException("Продукт с id: " + entry.getKey() + " не найден")), entry.getValue()))
            .toList();
    return orderMapper.toPlFull(order).withProducts(productToQuantityMap);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> updateStatus(@PathVariable("id") Long id, @RequestParam String status) {
    Reservation order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Заказ с id: " + id + " не найден"));
    order.setStatus(status);
    orderRepository.save(order);
    return ResponseEntity.ok().build();
  }

}
