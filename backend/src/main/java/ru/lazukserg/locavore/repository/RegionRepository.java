package ru.lazukserg.locavore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.lazukserg.locavore.models.ERegion;
import ru.lazukserg.locavore.models.Region;

import java.util.List;
import java.util.Optional;

@Repository
public interface RegionRepository extends JpaRepository<Region, Long> {
  Optional<Region> findByName(ERegion name);

  List<Region> findAll();
}
