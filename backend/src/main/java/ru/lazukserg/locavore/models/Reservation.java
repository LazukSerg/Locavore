package ru.lazukserg.locavore.models;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "reservation")
public class Reservation  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(name = "date-order")
    private String dateOfCreation;

//    @Column(name = "date-pick-up")
    private String dateOfPickUp;

    private int countPosition;

    private int totalOrder;

    private Long userId;

    @ElementCollection
    @CollectionTable(name = "reservation_product_mapping",
            joinColumns = {@JoinColumn(name = "reservation_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "product_id")
    @Column(name = "count_products")
//    @OneToMany(mappedBy = "order_product_id")
//    @MapKeyColumn(name = "product_index")
    private Map<Long, Integer> products;

    public Reservation () {
    }

    public Reservation(Long id, String dateOfCreation, String dateOfPickUp, int countPosition, int totalOrder, Long userId, Map<Long, Integer> products) {
        this.id = id;
        this.dateOfCreation = dateOfCreation;
        this.dateOfPickUp = dateOfPickUp;
        this.countPosition = countPosition;
        this.totalOrder = totalOrder;
        this.userId = userId;
        this.products = products;
    }


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

    public Map<Long, Integer> getProducts() {
        return products;
    }

    public void setProducts(Map<Long, Integer> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id=" + id +
                ", dateOfCreation='" + dateOfCreation + '\'' +
                ", dateOfPickUp='" + dateOfPickUp + '\'' +
                ", countPosition=" + countPosition +
                ", totalOrder=" + totalOrder +
                ", userId=" + userId +
                ", products=" + products +
                '}';
    }
}

