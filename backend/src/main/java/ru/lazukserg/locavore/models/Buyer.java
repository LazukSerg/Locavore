package ru.lazukserg.locavore.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "buyer")
public class Buyer extends User {

  @OneToMany(mappedBy = "buyer")
  private List<Reservation> reservations;

  public Buyer() {
  }

  public Buyer(String username, String phoneNumber, String email, String password, Region region, Role role) {
    super(username, phoneNumber, email, password, region, role);
  }
}
