package com.styleai.service;

import com.styleai.dto.StyleProfileDto;
import com.styleai.dto.UserResponse;
import com.styleai.entity.StyleProfile;
import com.styleai.entity.User;
import com.styleai.exception.ResourceNotFoundException;
import com.styleai.repository.StyleProfileRepository;
import com.styleai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final StyleProfileRepository styleProfileRepository;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public UserResponse getMe(String email) {
        User user = getByEmail(email);
        StyleProfile sp = styleProfileRepository.findByUserId(user.getId()).orElse(null);
        return toResponse(user, sp);
    }

    public UserResponse updateStyleProfile(String email, StyleProfileDto dto) {
        User user = getByEmail(email);
        StyleProfile sp = styleProfileRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    StyleProfile n = new StyleProfile();
                    n.setUser(user);
                    return n;
                });
        sp.setAesthetic(dto.aesthetic());
        sp.setPreferredColors(dto.preferredColors());
        sp.setSize(dto.size());
        sp.setBudget(dto.budget());
        styleProfileRepository.save(sp);
        return toResponse(user, sp);
    }

    private UserResponse toResponse(User user, StyleProfile sp) {
        StyleProfileDto spDto = sp == null ? null
                : new StyleProfileDto(sp.getAesthetic(), sp.getPreferredColors(), sp.getSize(), sp.getBudget());
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole().name(), spDto);
    }
}
