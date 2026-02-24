package ru.lazukserg.locavore.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "seller")
public class Seller extends User {

  @ManyToOne
  private Region region;

  private String city;

  private String street;

  private String building;

  private String firstName;

  private String lastName;

  @OneToMany(mappedBy = "seller")
  private List<Product> products;

  @OneToMany(mappedBy = "seller")
  private List<Reservation> reservations;

  public Seller() {
  }

  public Seller(String username, String phoneNumber, String email, String password, Role role, Region region, String city, String street, String building, String firstName, String lastName) {
    super(username, phoneNumber, email, password, role);
    this.region = region;
    this.city = city;
    this.street = street;
    this.building = building;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}
