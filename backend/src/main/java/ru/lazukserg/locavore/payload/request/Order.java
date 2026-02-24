package ru.lazukserg.locavore.payload.request;

import lombok.Data;

import java.util.Map;

@Data
public class Order {

    private Long id;

    private String dateOfCreation;

    private String dateOfPickUp;

    private int countPosition;

    private int totalOrder;

    private String status;
    private Long buyerId;
    private Long sellerId;
//    private String sellerUserName;
    private String buyerPhone;

    private String buyerEmail;

    private Map<Long, Product> products;

    public Order() {
    }

//    public Order(Long id, String dateOfCreation, String dateOfPickUp, int countPosition, int totalOrder, Long userId, Map<Long, Product> products) {
//        this.id = id;
//        this.dateOfCreation = dateOfCreation;
//        this.dateOfPickUp = dateOfPickUp;
//        this.countPosition = countPosition;
//        this.totalOrder = totalOrder;
//        this.userId = userId;
//        this.products = products;
//    }



    //    @Override
//    public String toString() {
//        return "Order{" +
//                "id=" + id +
//                ", dateOfCreation='" + dateOfCreation + '\'' +
//                ", dateOfPickUp='" + dateOfPickUp + '\'' +
//                ", countPosition=" + countPosition +
//                ", totalOrder=" + totalOrder +
//                ", products=" + products +
//                '}';
//    }
}

