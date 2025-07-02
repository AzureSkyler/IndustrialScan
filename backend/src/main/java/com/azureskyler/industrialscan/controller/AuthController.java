package com.azureskyler.industrialscan.controller;

import com.azureskyler.industrialscan.exception.DuplicateEmailException;
import com.azureskyler.industrialscan.model.User;
import com.azureskyler.industrialscan.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getUsername() == null || user.getPassword() == null || user.getEmail() == null) {
            throw new DuplicateEmailException("给老子填信息123");
        }
        user.setCreatedAt(LocalDateTime.now());
        System.out.println("1");
        return authService.register(user);
    }
    public boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }
}