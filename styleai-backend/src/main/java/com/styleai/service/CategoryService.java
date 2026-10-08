package com.styleai.service;

import com.styleai.dto.CategoryRequest;
import com.styleai.entity.Category;
import com.styleai.exception.BadRequestException;
import com.styleai.exception.ResourceNotFoundException;
import com.styleai.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category create(CategoryRequest req) {
        if (categoryRepository.existsByNameIgnoreCase(req.name())) {
            throw new BadRequestException("Category already exists");
        }
        Category c = new Category();
        c.setName(req.name());
        return categoryRepository.save(c);
    }

    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found: " + id);
        }
        categoryRepository.deleteById(id);
    }
}
