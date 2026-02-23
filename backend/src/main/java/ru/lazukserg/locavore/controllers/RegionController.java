package ru.lazukserg.locavore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.mapper.RegionMapper;
import ru.lazukserg.locavore.models.Category;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.models.pl.RegionDTO;
import ru.lazukserg.locavore.repository.CategoryRepository;
import ru.lazukserg.locavore.repository.ProductRepository;
import ru.lazukserg.locavore.repository.RegionRepository;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/region")
public class RegionController {

  @Autowired
  RegionRepository regionRepository;

  @Autowired
  RegionMapper regionMapper;

  @GetMapping("/all")
  public List<RegionDTO> allRegions() {
    return regionRepository.findAll().stream().map(it -> regionMapper.toPl(it)).toList();
  }

}
