package com.fashion_webapp.fashion_backend.controller;

import com.fashion_webapp.fashion_backend.entity.ClothingItem;
import com.fashion_webapp.fashion_backend.repository.ClothingItemRepository;
import com.fashion_webapp.fashion_backend.service.S3Service;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ClothingItemController {

    private final S3Service s3Service;
    private final ClothingItemRepository repository;

    public ClothingItemController(S3Service s3Service, ClothingItemRepository repository) {
        this.s3Service = s3Service;
        this.repository = repository;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ClothingItem upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name) throws IOException {
        String imageUrl = s3Service.uploadFile(file);
        ClothingItem item = new ClothingItem();
        item.setName(name);
        item.setImageUrl(imageUrl);
        return repository.save(item);
    }

    @GetMapping
    public List<ClothingItem> getAll() {
        return repository.findAll();
    }
}
