package ru.lazukserg.locavore.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {

    @Value("${file.upload-dir:uploads/}")
    private String uploadDir;

    public String saveFile(MultipartFile file, String subDir) {
        try {
            // Создаём уникальное имя файла
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String fileName = System.currentTimeMillis() + "_" + UUID.randomUUID() + extension;

            // Путь для сохранения
            String fullPath = uploadDir + subDir + "/" + fileName;
            Path path = Paths.get(fullPath);

            // Создаём директории
            Files.createDirectories(path.getParent());
            // Сохраняем файл
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            // Возвращаем путь для БД
            return "/" + fullPath;

        } catch (IOException e) {
            throw new RuntimeException("Ошибка сохранения файла", e);
        }
    }

    public void deleteFile(String filePath) {
        try {
            if (filePath == null || filePath.isEmpty()) {
                return;
            }

            // Получаем полный путь к файлу
            Path path = Paths.get(uploadDir, filePath);
            Path fullPath = path.normalize();

            // Проверяем, существует ли файл
            if (Files.exists(fullPath)) {
                // Удаляем файл
                Files.delete(fullPath);
                log.info("File deleted successfully: {}", fullPath);
            } else {
                log.warn("File not found: {}", fullPath);
            }

        } catch (IOException e) {
            log.error("Failed to delete file: {}", filePath, e);
            throw new RuntimeException("Could not delete file: " + filePath, e);
        }
    }
}

