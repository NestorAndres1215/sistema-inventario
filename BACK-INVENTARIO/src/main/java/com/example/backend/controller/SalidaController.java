package com.example.backend.controller;

import java.util.List;
import com.example.backend.dto.request.SalidasRequest;
import com.example.backend.entity.DetalleSalida;
import com.example.backend.service.SalidaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/salidas")
@Tag(name = "Salidas")
@RequiredArgsConstructor
public class SalidaController {

    private final SalidaService detalleSalidaService;

    @PostMapping("/")
    public ResponseEntity<List<DetalleSalida>> crearDetalleSalida(@RequestBody List<SalidasRequest> listaDetalleSalida) {
        return ResponseEntity.ok(detalleSalidaService.crearDetalleSalida(listaDetalleSalida));
    }

    @GetMapping("/{id}")
    public DetalleSalida obtenerPorId(@PathVariable Long id) {
        return detalleSalidaService.obtenerPorId(id);
    }

    @GetMapping
    public List<DetalleSalida> obtenerTodas() {
        return detalleSalidaService.obtenerTodas();
    }

}
