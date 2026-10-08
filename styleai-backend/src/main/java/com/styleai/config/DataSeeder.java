package com.styleai.config;

import com.styleai.entity.*;
import com.styleai.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/** Inserts demo data the first time the app runs (only if tables are empty). */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedAdmin();
        if (categoryRepository.count() == 0) {
            seedCatalog();
        }
    }

    private void seedAdmin() {
        if (!userRepository.existsByEmail("admin@styleai.com")) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@styleai.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }
    }

    private void seedCatalog() {
        Map<String, Category> cats = new HashMap<>();
        for (String name : new String[]{"Outerwear", "Knitwear", "Tailored", "Footwear", "Accessories"}) {
            Category c = new Category();
            c.setName(name);
            cats.put(name, categoryRepository.save(c));
        }

        //   name                         brand             price  sale   rating category              aiPick views
        add("Minimalist Cashmere Coat",  "Atelier Noir",   225, 180.0, 4.9, cats.get("Outerwear"),   false, 40);
        add("Pleated Silk Blouse",       "Maison Studio",  280, 240.0, 5.0, cats.get("Tailored"),    true,  55);
        add("Architectural Wool Slacks", "Studio K",       230, 195.0, 4.8, cats.get("Tailored"),    true,  35);
        add("Tailored Blazer",           "Atelier Noir",   310, null,  4.7, cats.get("Tailored"),    true,  20);
        add("Structured Pants",          "Studio K",       190, null,  4.6, cats.get("Tailored"),    false, 15);
        add("Leather Loafers",           "Maison Studio",  260, null,  4.8, cats.get("Footwear"),    false, 25);
        add("Ribbed Mockneck",           "Knit Lab",       165, null,  4.7, cats.get("Knitwear"),    false, 60);
        add("Sculpted Mini Tote",        "Polène Paris",   380, null,  4.9, cats.get("Accessories"), false, 70);
        add("Selvedge Straight Leg",     "Denim Atelier",  145, null,  4.5, cats.get("Tailored"),    false, 30);
        add("Linear Acetate Frame",      "Optique Studio", 210, null,  4.6, cats.get("Accessories"), false, 18);
    }

    private void add(String name, String brand, double price, Double sale, double rating,
                     Category category, boolean aiPick, int views) {
        Product p = new Product();
        p.setName(name);
        p.setBrand(brand);
        p.setDescription(name + " by " + brand + " - curated for a Minimal Chic wardrobe.");
        p.setPrice(price);
        p.setDiscountPrice(sale);
        p.setRating(rating);
        p.setImageUrl("https://placehold.co/600x800?text=" + name.replace(' ', '+'));
        p.setAiPick(aiPick);
        p.setViewCount(views);
        p.setCategory(category);
        productRepository.save(p);
    }
}
