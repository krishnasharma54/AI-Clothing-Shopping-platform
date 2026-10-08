package com.styleai.dto;

public record UserResponse(Long id, String name, String email, String role, StyleProfileDto styleProfile) {
}
