package ru.lazukserg.locavore.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String image;

    private String structure;

    private String description;

    private int price;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Region region;

    private boolean local;

    public Product() {
    }

    public Product(String title, String image, String structure, int price, Category category) {
        this.title = title;
        this.image = image;
        this.structure = structure;
        this.price = price;
        this.category = category;
    }

}

