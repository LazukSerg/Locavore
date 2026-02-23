package ru.lazukserg.locavore.models;

import jakarta.persistence.*;
import lombok.Data;
import ru.lazukserg.locavore.utils.ERegionConverter;

@Entity
@Table(name = "region")
@Data
public class Region {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.STRING)
  @Column
  private ERegion name;

  public Region() {

  }

  public Region(ERegion name) {
    this.name = name;
  }
}