package ru.lazukserg.locavore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.models.Reservation;
import ru.lazukserg.locavore.payload.request.Order;
import ru.lazukserg.locavore.repository.OrderRepository;
import ru.lazukserg.locavore.utils.MailUtils;

import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {

  @Autowired
  OrderRepository orderRepository;

  @Autowired
  MailSender  mailSender;

  @PostMapping(value = "/create")
  public Reservation createOrder(@RequestBody Order order) {
    var mapProducts = order.getProducts().entrySet().stream()
            .collect(Collectors.toMap(Map.Entry::getKey, (x) -> x.getValue().getCount()));
    Reservation reservation = new Reservation(
            null,
            order.getDateOfCreation(),
            order.getDateOfPickUp(),
            order.getCountPosition(),
            order.getTotalOrder(),
            order.getUserId(),
            mapProducts
    );

    var result = orderRepository.save(reservation);
    SimpleMailMessage simpleMail = MailUtils.createMail(order, result.getId(), false);
    mailSender.send(simpleMail);
    SimpleMailMessage simpleMailToAdmin = MailUtils.createMail(order, result.getId(), true);
    mailSender.send(simpleMailToAdmin);
    return result;
  }

}
