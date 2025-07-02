package com.azureskyler.industrialscan.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private Long userId;
}