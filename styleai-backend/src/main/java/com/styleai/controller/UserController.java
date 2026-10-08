package com.styleai.controller;

import com.styleai.dto.StyleProfileDto;
import com.styleai.dto.UserResponse;
import com.styleai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse me(Authentication auth) {
        return userService.getMe(auth.getName());   // auth.getName() = email
    }

    @PutMapping("/me/style-profile")
    public UserResponse updateStyleProfile(Authentication auth, @RequestBody StyleProfileDto dto) {
        return userService.updateStyleProfile(auth.getName(), dto);
    }
}
