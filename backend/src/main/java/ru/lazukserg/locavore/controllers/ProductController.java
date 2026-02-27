package ru.lazukserg.locavore.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.lazukserg.locavore.mapper.ProductMapper;
import ru.lazukserg.locavore.models.Category;
import ru.lazukserg.locavore.models.Product;
import ru.lazukserg.locavore.models.Region;
import ru.lazukserg.locavore.models.Seller;
import ru.lazukserg.locavore.models.pl.ProductDTO;
import ru.lazukserg.locavore.repository.CategoryRepository;
import ru.lazukserg.locavore.repository.ProductRepository;
import ru.lazukserg.locavore.repository.RegionRepository;
import ru.lazukserg.locavore.repository.SellerRepository;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {

  @Autowired
  ProductRepository productRepository;
  @Autowired
  SellerRepository sellerRepository;
  @Autowired
  CategoryRepository categoryRepository;
  @Autowired
  RegionRepository regionRepository;

  @Autowired
  ProductMapper productMapper;

  @GetMapping("/all-by-seller/{id}")
  public List<ProductDTO> allProductsBySeller(@PathVariable("id") Long id) {
    List<Product> products = productRepository.findBySellerId(id);
    return products.stream().map(product -> productMapper.toPl(product)).toList();
  }

  @GetMapping("/{id}")
  public ProductDTO getProductById(@PathVariable("id") Long id) {
    return productRepository.findById(id)
            .map(productMapper::toPl)
            .orElseThrow(() -> new EntityNotFoundException("Товар с id " + id + " не найден"));
  }

  @PostMapping("/create")
  public ResponseEntity<Long> createProduct(@RequestBody ProductDTO productDTO) {
    Seller sellerRef = sellerRepository.getReferenceById(productDTO.getSeller().getId());
    Category categoryRef = categoryRepository.getReferenceById(productDTO.getCategory().getId());
    Region regionRef = regionRepository.getReferenceById(productDTO.getRegion().getId());
    Product newProduct = productRepository.save(productMapper.fromPl(productDTO, sellerRef, categoryRef, regionRef));
    return ResponseEntity.ok(newProduct.getId());
  }

//  @PostMapping("/api/products")
//  public ResponseEntity<?> addProduct(
//          @RequestParam("title") String title,
//          @RequestParam("certificate") MultipartFile certificate) {
//
//    // 1. Сохраняем файл
//    String fileName = System.currentTimeMillis() + "_" + certificate.getOriginalFilename();
//    String filePath = "/uploads/certificates/" + fileName;
//    certificate.transferTo(new File(filePath));
//
//    // 2. В БД сохраняем только путь
//    product.setCertificatePath(filePath);
//    productRepository.save(product);
//
//    return ResponseEntity.ok(product);
//  }


}
