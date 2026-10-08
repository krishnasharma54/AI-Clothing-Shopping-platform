package com.styleai.repository;

import com.styleai.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByAiPickTrue();

    List<Product> findTop10ByOrderByViewCountDesc();

    @Query("""
           SELECT p FROM Product p
           WHERE (:categoryId IS NULL OR p.category.id = :categoryId)
             AND (LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%'))
                  OR LOWER(p.brand) LIKE LOWER(CONCAT('%', :q, '%')))
             AND COALESCE(p.discountPrice, p.price) >= :minPrice
             AND COALESCE(p.discountPrice, p.price) <= :maxPrice
           ORDER BY p.id
           """)
    List<Product> search(@Param("categoryId") Long categoryId,
                         @Param("q") String q,
                         @Param("minPrice") double minPrice,
                         @Param("maxPrice") double maxPrice);
}
