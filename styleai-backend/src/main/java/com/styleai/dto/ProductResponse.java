package com.styleai.dto;

public record ProductResponse(
        Long id,
        String name,
        String brand,
        String description,
        double price,
        Double discountPrice,
        int discountPercent,
        double rating,
        String imageUrl,
        boolean aiPick,
        String category) {
}
