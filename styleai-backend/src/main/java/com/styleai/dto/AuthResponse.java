package com.styleai.dto;

public record AuthResponse(String token, String name, String email, String role) {
}
