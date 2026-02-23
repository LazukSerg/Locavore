package ru.lazukserg.locavore.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;


@Entity
@Data
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String image;

//    @OneToMany(fetch = FetchType.LAZY)
//    @JoinTable(name = "user_roles",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Product> products = new HashSet<>();

    public Category() {
    }

    public Category(String name, String image) {
        this.name = name;
        this.image = image;
    }
}
