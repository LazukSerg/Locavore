package ru.lazukserg.locavore.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

@Service
@Transactional
@Slf4j
public class ProductService {

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
    ProductMapper productMapper;

    /**
     * Создание нового продукта с опциональными файлами
     */
    public Long createProduct(ProductDTO productDTO,
                              MultipartFile image,
                              MultipartFile certificate) {

        log.info("Creating new product: {}", productDTO.getTitle());

        try {
            //Получаем ссылки на связанные сущности
            Seller sellerRef = sellerRepository.getReferenceById(productDTO.getSeller().getId());
            Category categoryRef = categoryRepository.getReferenceById(productDTO.getCategory().getId());
            Region regionRef = regionRepository.getReferenceById(productDTO.getRegion().getId());

            //Создаем продукт без файлов
            Product product = productMapper.fromPl(productDTO, sellerRef, categoryRef, regionRef);
            Product savedProduct = productRepository.save(product);
            log.debug("Product saved with ID: {}", savedProduct.getId());

            //Сохраняем файлы, если они есть
            saveProductFiles(savedProduct, image, certificate);

            //Возвращаем ID созданного продукта
            return savedProduct.getId();

        } catch (Exception e) {
            log.error("Failed to create product: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to create product: " + e.getMessage(), e);
        }
    }

    /**
     * Сохранение файлов продукта
     */
    private void saveProductFiles(Product product, MultipartFile image, MultipartFile certificate) {
        boolean updated = false;

        if (image != null && !image.isEmpty()) {
            String imagePath = fileStorageService.saveFile(image, "images");
            product.setImage(imagePath);
            updated = true;
            log.info("Image saved for product {}: {}", product.getId(), imagePath);
        }

        if (certificate != null && !certificate.isEmpty()) {
            String certificatePath = fileStorageService.saveFile(certificate, "certificates");
            product.setCertificate(certificatePath);
            updated = true;
            log.info("Certificate saved for product {}: {}", product.getId(), certificatePath);
        }

        // Обновляем продукт только если были добавлены файлы
        if (updated) {
            productRepository.save(product);
        }
    }

    public Long updateProduct(Long id, ProductDTO productDTO,
                                    MultipartFile image, MultipartFile certificate) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
        // Обновляем поля
        updateProductFields(existingProduct, productDTO);
        // Обновляем файлы
        updateProductFiles(existingProduct, image, certificate);
        Product updatedProduct = productRepository.save(existingProduct);
        return updatedProduct.getId();
    }

    private void updateProductFields(Product product, ProductDTO dto) {
        Seller seller = sellerRepository.getReferenceById(dto.getSeller().getId());
        Category category = categoryRepository.getReferenceById(dto.getCategory().getId());
        Region region = regionRepository.getReferenceById(dto.getRegion().getId());

        product.setTitle(dto.getTitle());
        product.setStructure(dto.getStructure());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setLocal(dto.isLocal());
        product.setSeller(seller);
        product.setCategory(category);
        product.setRegion(region);
    }

    private void updateProductFiles(Product product, MultipartFile image, MultipartFile certificate) {
        // Обновление изображения
        if (image != null && !image.isEmpty()) {
            // Удаляем старое изображение, если есть
            if (product.getImage() != null) {
                fileStorageService.deleteFile(product.getImage());
            }
            String imagePath = fileStorageService.saveFile(image, "images");
            product.setImage(imagePath);
        } else {
            // Если изображение не передано - удаляем старое
            if (product.getImage() != null) {
                fileStorageService.deleteFile(product.getImage());
                product.setImage(null);
            }
        }

        // Обновление сертификата
        if (certificate != null && !certificate.isEmpty()) {
            if (product.getCertificate() != null) {
                fileStorageService.deleteFile(product.getCertificate());
            }
            String certificatePath = fileStorageService.saveFile(certificate, "certificates");
            product.setCertificate(certificatePath);
        } else {
            if (product.getCertificate() != null) {
                fileStorageService.deleteFile(product.getCertificate());
                product.setCertificate(null);
            }
        }
    }
}