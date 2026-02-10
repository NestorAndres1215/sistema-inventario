package com.example.backend.controller;

import com.example.backend.entity.Reclamos;

import com.example.backend.service.ReclamoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Tag(name = "Correo")
public class CorreoController {

    private final ReclamoService reclamoService;

    @PostMapping("/reclamo/{id}/enviar-disculpas")
    public ResponseEntity<Reclamos> enviarDisculpas(@PathVariable Long id, @RequestBody String mensaje) {
        return ResponseEntity.ok(reclamoService.enviarDisculpasReclamo(id, mensaje));
    }

}
