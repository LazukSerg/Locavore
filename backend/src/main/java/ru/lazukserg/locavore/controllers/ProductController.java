package ru.lazukserg.locavore.controllers;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
import ru.lazukserg.locavore.service.FileStorageService;
import ru.lazukserg.locavore.service.ProductService;

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
  FileStorageService fileStorageService;

  @Autowired
  ProductService productService;

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

  @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Long> createProduct(
          @RequestPart("product") ProductDTO productDTO,
          @RequestPart(value = "image", required = false) MultipartFile image,
          @RequestPart(value = "certificate", required = false) MultipartFile certificate) {

    // Получаем ссылки на связанные сущности
    Seller sellerRef = sellerRepository.getReferenceById(productDTO.getSeller().getId());
    Category categoryRef = categoryRepository.getReferenceById(productDTO.getCategory().getId());
    Region regionRef = regionRepository.getReferenceById(productDTO.getRegion().getId());

    // Создаём товар
    Product newProduct = productMapper.fromPl(productDTO, sellerRef, categoryRef, regionRef);

    // Сохраняем товар сначала (чтобы получить ID)
    Product savedProduct = productRepository.save(newProduct);

    // Сохраняем файлы и обновляем пути
    if (image != null && !image.isEmpty()) {
      String imagePath = fileStorageService.saveFile(image, "images");
      savedProduct.setImage(imagePath);
    }

    if (certificate != null && !certificate.isEmpty()) {
      String certificatePath = fileStorageService.saveFile(certificate, "certificates");
      savedProduct.setCertificate(certificatePath);
    }

    // Обновляем товар с путями к файлам
    productRepository.save(savedProduct);

    return ResponseEntity.ok(savedProduct.getId());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Long> deleteProductById(@PathVariable("id") Long id) {
    productRepository.deleteById(id);
    return ResponseEntity.ok(id);
  }

  @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Long> updateProduct(
          @PathVariable Long id,
          @RequestPart("product") ProductDTO productDTO,
          @RequestPart(value = "image", required = false) MultipartFile image,
          @RequestPart(value = "certificate", required = false) MultipartFile certificate) {

    Long updateId = productService.updateProduct(id, productDTO, image, certificate);
    return ResponseEntity.ok(updateId);
  }


}
