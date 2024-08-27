package ru.lazukserg.locavore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.lazukserg.locavore.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Optional<User> findByEmail(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
}
