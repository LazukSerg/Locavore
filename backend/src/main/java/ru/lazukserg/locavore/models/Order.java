//package ru.lazukserg.locavore.models;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotBlank;
//
//import java.util.Date;
//import java.util.List;
//
//@Entity
//@Table(name = "order")
//public class Order {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private Date dateOrder;
//
//    private String datePickUp;
//
//    private int countPosition;
//
//    private int totalOrder;
//
//    private Long userId;
//
//    private List<Product> products;
//
//    public Order() {
//    }
//
//    public Order(String title, String image, String structure, int price, Category category) {
//        this.title = title;
//        this.image = image;
//        this.structure = structure;
//        this.price = price;
//        this.category = category;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getImage() {
//        return image;
//    }
//
//    public void setImage(String image) {
//        this.image = image;
//    }
//
//    public String getStructure() {
//        return structure;
//    }
//
//    public void setStructure(String structure) {
//        this.structure = structure;
//    }
//
//    public int getPrice() {
//        return price;
//    }
//
//    public void setPrice(int price) {
//        this.price = price;
//    }
//
//    public Category getCategory() {
//        return category;
//    }
//
//    public void setCategory(Category category) {
//        this.category = category;
//    }
//}
//
