package ru.lazukserg.locavore.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "reservation")
@Getter
@Setter
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

    private String status;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

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

    public Reservation(Long id, String dateOfCreation, String dateOfPickUp, int countPosition, int totalOrder, String status, Buyer buyer, Seller seller, Map<Long, Integer> products) {
        this.id = id;
        this.dateOfCreation = dateOfCreation;
        this.dateOfPickUp = dateOfPickUp;
        this.countPosition = countPosition;
        this.totalOrder = totalOrder;
        this.status = status;
        this.buyer = buyer;
        this.seller = seller;
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
                ", status='" + status + '\'' +
                ", buyer=" + buyer +
                ", seller=" + seller +
                ", products=" + products +
                '}';
    }
}

