package ru.lazukserg.locavore.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "buyer")
public class Buyer extends User {

  @OneToMany
  private List<Reservation> reservations;

  public Buyer() {
  }

  public Buyer(String username, String phoneNumber, String email, String password, Role role) {
    super(username, phoneNumber, email, password, role);
  }

}
