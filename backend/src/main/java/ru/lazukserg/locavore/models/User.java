package ru.lazukserg.locavore.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "users", 
    uniqueConstraints = { 
//      @UniqueConstraint(columnNames = "username"),
      @UniqueConstraint(columnNames = "email") 
    })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 30)
  private String username;

  @NotBlank
  @Size(max = 20)
  private String phoneNumber;
  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  @ManyToOne
  private Region region;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinTable(  name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Role role = null;

  public User() {
  }

  public User(String username, String phoneNumber, String email, String password, Region region, Role role) {
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.region = region;
    this.role = role;
  }

}
