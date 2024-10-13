package ru.lazukserg.locavore.payload.request;

import jakarta.validation.constraints.NotBlank;


public class Product {
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String image;

    private int count;

    private int price;


    public Product() {
    }

    public Product(Long id, String title, String image, int count, int price) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.count = count;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}

