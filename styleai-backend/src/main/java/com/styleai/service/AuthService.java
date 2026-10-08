package com.styleai.service;

import com.styleai.dto.AuthResponse;
import com.styleai.dto.LoginRequest;
import com.styleai.dto.RegisterRequest;
import com.styleai.entity.Role;
import com.styleai.entity.User;
import com.styleai.exception.BadRequestException;
import com.styleai.repository.UserRepository;
import com.styleai.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new BadRequestException("Email already registered");
        }
        User user = new User();
        user.setName(req.name());
        user.setEmail(req.email());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setRole(Role.USER);
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());
    }

    public AuthResponse login(LoginRequest req) {
        // throws BadCredentialsException if wrong
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password()));

        User user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new BadRequestException("User not found"));

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());
    }
}
