package ru.lazukserg.locavore.payload.request;

import java.util.Map;


public class Order {

    private Long id;

    private String dateOfCreation;

    private String dateOfPickUp;

    private int countPosition;

    private int totalOrder;

    private Long userId;
    private String userPhone;

    private String userEmail;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(String dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public String getDateOfPickUp() {
        return dateOfPickUp;
    }

    public void setDateOfPickUp(String dateOfPickUp) {
        this.dateOfPickUp = dateOfPickUp;
    }

    public int getCountPosition() {
        return countPosition;
    }

    public void setCountPosition(int countPosition) {
        this.countPosition = countPosition;
    }

    public int getTotalOrder() {
        return totalOrder;
    }

    public void setTotalOrder(int totalOrder) {
        this.totalOrder = totalOrder;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Map<Long, Product> getProducts() {
        return products;
    }

    public void setProducts(Map<Long, Product> products) {
        this.products = products;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

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

