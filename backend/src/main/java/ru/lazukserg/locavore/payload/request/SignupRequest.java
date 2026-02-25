package ru.lazukserg.locavore.payload.request;

import java.util.Set;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 30)
  private String username;

  @NotBlank
  @Size(max = 20)
  private String phoneNumber;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private String role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  private String region;

  private String settlement;

  private String street;

  private String building;

  private String firstName;

  private String lastName;
}
