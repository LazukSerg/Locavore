package ru.lazukserg.locavore.payload.response;

import lombok.Data;
import ru.lazukserg.locavore.models.pl.RegionDTO;

import java.util.List;

//@Data
public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private Long id;
  private String username;
  private String email;
  private String region;
  private String role;

  public JwtResponse(String accessToken, Long id, String username, String email, String region, String role) {
    this.token = accessToken;
    this.id = id;
    this.username = username;
    this.email = email;
    this.region = region;
    this.role = role;
  }

  public String getAccessToken() {
    return token;
  }

  public void setAccessToken(String accessToken) {
    this.token = accessToken;
  }

  public String getTokenType() {
    return type;
  }

  public void setTokenType(String tokenType) {
    this.type = tokenType;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getRole() {
    return role;
  }

  public String getRegion() {
    return region;
  }

  public void setRegion(String region) {
    this.region = region;
  }
}
