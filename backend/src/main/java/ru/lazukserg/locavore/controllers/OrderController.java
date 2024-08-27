//package ru.lazukserg.locavore.controllers;
//
//import ru.lazukserg.locavore.models.Category;
//import ru.lazukserg.locavore.models.Order;
//import ru.lazukserg.locavore.models.Product;
//import ru.lazukserg.locavore.repository.CategoryRepository;
//import ru.lazukserg.locavore.repository.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RestController
//@RequestMapping("/api/order")
//public class OrderController {
//
//  @Autowired
//  OrderRepository orderRepository;
//
//  @PostMapping("/send")
//  public Res allCategories(@RequestBody Order order) {
//    return orderRepository.saveOrder(order);
//  }
//
//}
