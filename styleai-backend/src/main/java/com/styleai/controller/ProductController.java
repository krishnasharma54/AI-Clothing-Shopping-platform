package com.styleai.controller;

import com.styleai.dto.ProductRequest;
import com.styleai.dto.ProductResponse;
import com.styleai.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    // GET /api/products?category=1&q=coat&minPrice=100&maxPrice=300
    @GetMapping
    public List<ProductResponse> search(@RequestParam(name = "category", required = false) Long categoryId,
                                        @RequestParam(required = false) String q,
                                        @RequestParam(required = false) Double minPrice,
                                        @RequestParam(required = false) Double maxPrice) {
        return productService.search(categoryId, q, minPrice, maxPrice);
    }

    @GetMapping("/recommended")
    public List<ProductResponse> recommended() {
        return productService.recommended();
    }

    @GetMapping("/trending")
    public List<ProductResponse> trending() {
        return productService.trending();
    }

    @GetMapping("/{id}")
    public ProductResponse get(@PathVariable Long id) {
        return productService.getById(id);
    }

    // ---- admin only (see SecurityConfig) ----
    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(req));
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductRequest req) {
        return productService.update(id, req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
