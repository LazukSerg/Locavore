package ru.lazukserg.locavore.controllers;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.lazukserg.locavore.models.*;
import ru.lazukserg.locavore.models.pl.RegionDTO;
import ru.lazukserg.locavore.payload.request.LoginRequest;
import ru.lazukserg.locavore.payload.request.SignupRequest;
import ru.lazukserg.locavore.payload.response.JwtResponse;
import ru.lazukserg.locavore.payload.response.MessageResponse;
import ru.lazukserg.locavore.repository.RegionRepository;
import ru.lazukserg.locavore.repository.RoleRepository;
import ru.lazukserg.locavore.repository.UserRepository;
import ru.lazukserg.locavore.security.jwt.JwtUtils;
import ru.lazukserg.locavore.security.services.UserDetailsImpl;

import static ru.lazukserg.locavore.models.ERegion.valueOfString;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  RegionRepository regionRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @PostMapping("/signin")
  public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();    
    String role = userDetails.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .findFirst().get();

    return ResponseEntity.ok(new JwtResponse(jwt, 
                         userDetails.getId(), 
                         userDetails.getUsername(), 
                         userDetails.getEmail(),
                         userDetails.getRegion().getName().getDisplayName(),
                         role));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest request) {
    if (userRepository.existsByUsername(request.getUsername())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Ошибка: такой имя уже используется!"));
    }

    if (userRepository.existsByEmail(request.getEmail())) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Ошибка: такой email уже используется!"));
    }

    User user;
    Region region = regionRepository.findByName(valueOfString(request.getRegion()))
            .orElseThrow(() -> new RuntimeException("Ошибка: регион отсутствует в базе данных."));

    switch (request.getRole()) {
      case "seller":
        Role sellerRole = roleRepository.findByName(ERole.ROLE_SELLER)
                .orElseThrow(() -> new RuntimeException("Ошибка: Роль Продавец не найдена в базе данных."));
        user = new Seller(
                request.getUsername(),
                request.getPhoneNumber(),
                request.getEmail(),
                encoder.encode(request.getPassword()),
                sellerRole,
                region,
                request.getSettlement(),
                request.getStreet(),
                request.getBuilding(),
                request.getFirstName(),
                request.getLastName()
        );
        break;

      case "buyer":
        Role buyerRole = roleRepository.findByName(ERole.ROLE_BUYER)
                .orElseThrow(() -> new RuntimeException("Ошибка: Роль Покупатель не найдена в базе данных."));
        user = new Buyer(
                request.getUsername(),
                request.getPhoneNumber(),
                request.getEmail(),
                encoder.encode(request.getPassword()),
                region,
                buyerRole
        );
        break;

      default:
        throw new RuntimeException("Ошибка: не указана роль нового пользователя.");
    }

    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("Пользователь успешно зарегистрирован!"));
  }
}
