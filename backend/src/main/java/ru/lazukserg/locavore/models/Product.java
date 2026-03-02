package ru.lazukserg.locavore.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
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

    private String image;

    private String certificate;

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

    public Product(String title, String image, String certificate, String structure, int price, Category category) {
        this.title = title;
        this.image = image;
        this.certificate = certificate;
        this.structure = structure;
        this.price = price;
        this.category = category;
    }

    public Product(String title, String image, String certificate, String structure, String description, int price, Seller seller, Category category, Region region, boolean local) {
        this.title = title;
        this.image = image;
        this.certificate = certificate;
        this.structure = structure;
        this.description = description;
        this.price = price;
        this.seller = seller;
        this.category = category;
        this.region = region;
        this.local = local;
    }
}

