package com.styleai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String brand;

    @Column(length = 1000)
    private String description;

    /** Original price */
    @Column(nullable = false)
    private double price;

    /** Sale price (null = no discount) */
    private Double discountPrice;

    private double rating;

    private String imageUrl;

    private int stock = 100;

    /** Shown as the "AI Pick" badge */
    private boolean aiPick;

    /** Used for the "Trending Now" list */
    private int viewCount;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;
}
