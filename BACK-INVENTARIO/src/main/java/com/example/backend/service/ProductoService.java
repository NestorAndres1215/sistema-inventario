package com.example.backend.service;

import com.example.backend.dto.request.ProductoRequest;
import com.example.backend.entity.Producto;

import java.util.List;

public interface ProductoService {

    List<Producto> obtenerTodosLosProductos();
    Producto obtenerProductoPorId(Long id);
    Producto agregarProducto(ProductoRequest productoDTO);
    Producto actualizarProducto(ProductoRequest productoDTO);
    List<Producto> obtenerProductosActivados();
    List<Producto> obtenerProductosDesactivados();
    Producto activarProducto(Long id);
    Producto desactivarProducto(Long id);
    Producto productoConMayorStock();
    Producto productoConMenorStock();
    List<Producto> productosConStockBajo(int limite);
    List<Producto> productosSinStock();
    List<Producto> listarProductosPorProveedor(Long proveedorId);
    List<Producto> listarPorNombre(String nombre);
    List<Producto> top10ProductosMasBaratos();
    List<Producto> top10ProductosMasCaros();
    List<Producto> top10ProductosMasBaratosActivos();
    List<Producto> top10ProductosMasCarosActivos();
}
