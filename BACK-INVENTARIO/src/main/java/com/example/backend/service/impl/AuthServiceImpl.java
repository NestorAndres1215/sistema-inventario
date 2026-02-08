package com.example.backend.service.impl;

import com.example.backend.constants.GlobalErrorMessages;
import com.example.backend.constants.NotFoundMessages;
import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.response.TokenResponse;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.security.JwtUtils;
import com.example.backend.security.UserDetailsServiceImpl;
import com.example.backend.service.AuthService;
import com.example.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService usuarioService;
    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    public TokenResponse login(LoginRequest loginRequestDTO) {
        validarIdentificador(loginRequestDTO.getLogin());
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequestDTO.getLogin(), loginRequestDTO.getPassword()));

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequestDTO.getLogin());
        String token = jwtUtils.generateToken(userDetails);

        return new TokenResponse(token);
    }

    @Override
    public Usuario actualUsuario(Principal principal) {
        if (principal == null || principal.getName() == null) {
            throw new ResourceNotFoundException(GlobalErrorMessages.NO_AUTORIZADO);
        }

        return (Usuario) userDetailsService.loadUserByUsername(principal.getName());
    }

    private void validarIdentificador(String identificador) {
        if (identificador == null || identificador.trim().isEmpty()) {
            throw new ResourceNotFoundException(NotFoundMessages.CODIGO_NO_ENCONTRADO);
        }

        if (!usuarioService.usuarioExistePorUsername(identificador)) {
            throw new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO);
        }
    }

}
