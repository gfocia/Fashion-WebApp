package com.fashion_webapp.fashion_backend.repository;

import com.fashion_webapp.fashion_backend.entity.ClothingItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothingItemRepository extends JpaRepository<ClothingItem, Long> {
}
