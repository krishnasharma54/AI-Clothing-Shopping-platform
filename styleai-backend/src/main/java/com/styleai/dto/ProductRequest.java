package com.styleai.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductRequest(
        @NotBlank(message = "Name is required") String name,
        String brand,
        String description,
        @Positive(message = "Price must be positive") double price,
        Double discountPrice,
        double rating,
        String imageUrl,
        int stock,
        boolean aiPick,
        @NotNull(message = "categoryId is required") Long categoryId) {
}
