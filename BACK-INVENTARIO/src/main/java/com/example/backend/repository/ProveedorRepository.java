package com.example.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Proveedor;


public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    List<Proveedor> findByEstadoIsTrue();

    List<Proveedor> findByEstadoIsFalse();

    List<Proveedor> findByRuc(String ruc);

    List<Proveedor> findByNombre(String nombre);

    List<Proveedor> findByTelefono(String telefono);

    List<Proveedor> findByEmail(String email);

    boolean existsByRuc(String ruc);

    boolean existsByEmail(String email);

    boolean existsByTelefono(String telefono);
}
