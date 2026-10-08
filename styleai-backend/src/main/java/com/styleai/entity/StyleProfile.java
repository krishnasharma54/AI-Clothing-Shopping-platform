package com.styleai.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "style_profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class StyleProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    private String aesthetic;        // e.g. "Minimal Chic"
    private String preferredColors;  // e.g. "black,beige,navy"
    private String size;             // e.g. "M"
    private Double budget;           // max budget per item
}
