package com.example.backend.service;

import com.example.backend.entity.Reclamos;

import java.util.List;

public interface ReclamoService {
    List<Reclamos> obtenerTodosLosReclamos();
    Reclamos agregarReclamo(Reclamos reclamo);
    Reclamos obtenerReclamoPorId(Long id);
    Reclamos actualizarReclamo(Reclamos reclamo);
    Reclamos enviarDisculpasReclamo(Long id, String mensaje);
    Reclamos activarReclamo(Long id);
    Reclamos desactivarReclamo(Long id);
    Reclamos cambiarEstadoReclamo(Long id, boolean estado);
    List<Reclamos> obtenerReclamosDesactivados();
    List<Reclamos> obtenerReclamosActivados();
}
