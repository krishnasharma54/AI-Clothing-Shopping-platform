package com.styleai.service;

import com.styleai.dto.ProductRequest;
import com.styleai.dto.ProductResponse;
import com.styleai.entity.Category;
import com.styleai.entity.Product;
import com.styleai.exception.ResourceNotFoundException;
import com.styleai.repository.CategoryRepository;
import com.styleai.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    // ---------- READ ----------
    public List<ProductResponse> search(Long categoryId, String q, Double minPrice, Double maxPrice) {
        String keyword = (q == null) ? "" : q.trim();
        double min = (minPrice == null) ? 0 : minPrice;
        double max = (maxPrice == null) ? 1_000_000 : maxPrice;
        return productRepository.search(categoryId, keyword, min, max)
                .stream().map(this::toResponse).toList();
    }

    public ProductResponse getById(Long id) {
        Product p = findOrThrow(id);
        p.setViewCount(p.getViewCount() + 1);   // feeds "Trending Now"
        productRepository.save(p);
        return toResponse(p);
    }

    public List<ProductResponse> recommended() {
        return productRepository.findByAiPickTrue().stream().map(this::toResponse).toList();
    }

    public List<ProductResponse> trending() {
        return productRepository.findTop10ByOrderByViewCountDesc()
                .stream().map(this::toResponse).toList();
    }

    // ---------- WRITE (admin) ----------
    public ProductResponse create(ProductRequest req) {
        Product p = new Product();
        apply(p, req);
        return toResponse(productRepository.save(p));
    }

    public ProductResponse update(Long id, ProductRequest req) {
        Product p = findOrThrow(id);
        apply(p, req);
        return toResponse(productRepository.save(p));
    }

    public void delete(Long id) {
        productRepository.delete(findOrThrow(id));
    }

    // ---------- helpers ----------
    public Product findOrThrow(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    private void apply(Product p, ProductRequest req) {
        Category category = categoryRepository.findById(req.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + req.categoryId()));
        p.setName(req.name());
        p.setBrand(req.brand());
        p.setDescription(req.description());
        p.setPrice(req.price());
        p.setDiscountPrice(req.discountPrice());
        p.setRating(req.rating());
        p.setImageUrl(req.imageUrl());
        p.setStock(req.stock());
        p.setAiPick(req.aiPick());
        p.setCategory(category);
    }

    public ProductResponse toResponse(Product p) {
        int percent = 0;
        if (p.getDiscountPrice() != null && p.getPrice() > 0) {
            percent = (int) Math.round((p.getPrice() - p.getDiscountPrice()) / p.getPrice() * 100);
        }
        return new ProductResponse(
                p.getId(), p.getName(), p.getBrand(), p.getDescription(),
                p.getPrice(), p.getDiscountPrice(), percent, p.getRating(),
                p.getImageUrl(), p.isAiPick(),
                p.getCategory() == null ? null : p.getCategory().getName());
    }
}
