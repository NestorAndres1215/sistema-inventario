package com.example.backend.service;

import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.response.TokenResponse;
import com.example.backend.entity.Usuario;

import java.security.Principal;

public interface AuthService {
    TokenResponse login(LoginRequest loginRequestDTO);

    Usuario actualUsuario(Principal principal);
}
