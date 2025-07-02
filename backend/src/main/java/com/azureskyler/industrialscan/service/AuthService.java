package com.azureskyler.industrialscan.service;

import com.azureskyler.industrialscan.exception.DuplicateEmailException;
import com.azureskyler.industrialscan.exception.DuplicateUsernameException;
import com.azureskyler.industrialscan.model.User;
import com.azureskyler.industrialscan.repository.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserMapper userMapper;

    public ResponseEntity<?> register(User user) {
        System.out.println("2");
        if (userMapper.existsByEmail(user.getEmail())) {
            throw new DuplicateEmailException("邮箱已被注册");
        }

        user.setPassword(user.getPassword());
        userMapper.insert(user);
        return ResponseEntity.ok(Map.of(
                "message", "注册成功",
                "userId", user.getId()
        ));
    }
}