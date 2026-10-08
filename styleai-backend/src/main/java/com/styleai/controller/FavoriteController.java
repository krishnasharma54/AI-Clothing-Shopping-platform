package com.styleai.controller;

import com.styleai.dto.ProductResponse;
import com.styleai.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    public List<ProductResponse> list(Authentication auth) {
        return favoriteService.list(auth.getName());
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Void> add(Authentication auth, @PathVariable Long productId) {
        favoriteService.add(auth.getName(), productId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> remove(Authentication auth, @PathVariable Long productId) {
        favoriteService.remove(auth.getName(), productId);
        return ResponseEntity.noContent().build();
    }
}
