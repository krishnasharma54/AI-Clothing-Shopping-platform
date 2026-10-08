package com.styleai.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "favorites",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "product_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDateTime createdAt = LocalDateTime.now();
}
