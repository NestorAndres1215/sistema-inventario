package com.example.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Producto;
import org.springframework.data.jpa.repository.Query;


public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findByEstadoIsTrue();

    List<Producto> findByEstadoIsFalse();

    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    List<Producto> findByStockLessThanEqual(int stock);

    List<Producto> findByStockEquals(int stock);

    List<Producto> findByProveedorProveedorId(Long proveedorId);

    List<Producto> findTop10ByOrderByPrecioAsc();

    List<Producto> findTop10ByOrderByPrecioDesc();

    List<Producto> findTop10ByEstadoIsTrueOrderByPrecioAsc();

    List<Producto> findTop10ByEstadoIsTrueOrderByPrecioDesc();

    Producto findTopByOrderByStockDesc();

    Producto findTopByOrderByStockAsc();


}