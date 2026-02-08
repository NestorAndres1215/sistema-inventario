package com.example.backend.service;

import com.example.backend.dto.request.ProveedorRequest;
import com.example.backend.entity.Proveedor;

import java.util.List;


public interface ProveedorService {

    Proveedor crearProveedor(ProveedorRequest proveedorDTO);

    Proveedor actualizarProveedor(ProveedorRequest proveedorDTO);

    List<Proveedor> listarTodos();

    List<Proveedor> listarPorRuc(String ruc);

    List<Proveedor> listarPorNombre(String nombre);

    List<Proveedor> listarPorTelefono(String telefono);

    List<Proveedor> listarPorEmail(String email);

    List<Proveedor> findByEstadoIsTrue();

    List<Proveedor> findByEstadoIsFalse();

    Proveedor obtenerPorId(Long id);

    Proveedor activarProveedor(Long id);

    Proveedor desactivarProveedor(Long id);
}
