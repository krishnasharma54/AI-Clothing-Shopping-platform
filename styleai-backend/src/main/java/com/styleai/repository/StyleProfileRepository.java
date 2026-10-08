package com.styleai.repository;

import com.styleai.entity.StyleProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StyleProfileRepository extends JpaRepository<StyleProfile, Long> {
    Optional<StyleProfile> findByUserId(Long userId);
}
