package com.styleai.service;

import com.styleai.dto.ProductResponse;
import com.styleai.entity.Favorite;
import com.styleai.entity.Product;
import com.styleai.entity.User;
import com.styleai.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserService userService;
    private final ProductService productService;

    @Transactional
    public void add(String email, Long productId) {
        User user = userService.getByEmail(email);
        Product product = productService.findOrThrow(productId);

        if (!favoriteRepository.existsByUserIdAndProductId(user.getId(), productId)) {
            Favorite f = new Favorite();
            f.setUser(user);
            f.setProduct(product);
            favoriteRepository.save(f);
        }
    }

    @Transactional
    public void remove(String email, Long productId) {
        User user = userService.getByEmail(email);
        favoriteRepository.deleteByUserIdAndProductId(user.getId(), productId);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> list(String email) {
        User user = userService.getByEmail(email);
        return favoriteRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .map(f -> productService.toResponse(f.getProduct()))
                .toList();
    }
}
