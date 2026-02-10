package com.example.backend.service;

import com.example.backend.dto.request.SalidasRequest;
import com.example.backend.entity.DetalleSalida;

import java.util.List;

public interface SalidaService {

    List<DetalleSalida> crearDetalleSalida(List<SalidasRequest> listaDetalleSalida);

    DetalleSalida obtenerPorId(Long id);

    List<DetalleSalida> obtenerTodas();
}
