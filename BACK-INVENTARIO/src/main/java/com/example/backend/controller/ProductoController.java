package com.example.backend.controller;

import java.util.List;
import com.example.backend.dto.request.ProductoRequest;
import com.example.backend.service.ProductoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.entity.Producto;

@RestController
@RequestMapping("/producto")
@Tag(name = "Producto")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public List<Producto> obtenerTodos() {
        return productoService.obtenerTodosLosProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.obtenerProductoPorId(id));
    }

    @GetMapping("/activadas")
    public List<Producto> obtenerActivadas() {
        return productoService.obtenerProductosActivados();
    }

    @GetMapping("/desactivadas")
    public List<Producto> obtenerDesactivadas() {
        return productoService.obtenerProductosDesactivados();
    }

    @PostMapping("/")
    public ResponseEntity<Producto> agregarProducto(@RequestBody ProductoRequest productoDTO) {
        return ResponseEntity.ok(productoService.agregarProducto(productoDTO));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Producto> actualizarProducto(
            @RequestBody ProductoRequest productoDTO) {
        return ResponseEntity.ok(productoService.actualizarProducto(productoDTO));
    }

    @PostMapping("/activar/{id}")
    public ResponseEntity<Producto> activarProducto(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.activarProducto(id));
    }

    @PostMapping("/desactivar/{id}")
    public ResponseEntity<Producto> desactivarProducto(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.desactivarProducto(id));
    }

    @GetMapping("/mayor-stock")
    public ResponseEntity<Producto> productoConMayorStock() {
        return ResponseEntity.ok(productoService.productoConMayorStock());
    }

    @GetMapping("/menor-stock")
    public ResponseEntity<Producto> productoConMenorStock() {
        return ResponseEntity.ok(productoService.productoConMenorStock());
    }

    @GetMapping("/proveedor/{proveedorId}")
    public ResponseEntity<List<Producto>> listarPorProveedor(@PathVariable Long proveedorId) {
        return ResponseEntity.ok(productoService.listarProductosPorProveedor(proveedorId));
    }

    @GetMapping("/top10-mas-baratos")
    public ResponseEntity<List<Producto>> top10ProductosMasBaratos() {
        return ResponseEntity.ok(productoService.top10ProductosMasBaratos());
    }

    @GetMapping("/top10-mas-baratos-activos")
    public ResponseEntity<List<Producto>> top10ProductosMasBaratosActivos() {
        return ResponseEntity.ok(productoService.top10ProductosMasBaratosActivos());
    }

    @GetMapping("/top10-mas-caros-activos")
    public ResponseEntity<List<Producto>> top10ProductosMasCarosActivos() {
        return ResponseEntity.ok(productoService.top10ProductosMasCarosActivos());
    }

    @GetMapping("/stock-bajo")
    public List<Producto> stockBajo(@RequestParam(defaultValue = "5") int limite) {
        return productoService.productosConStockBajo(limite);
    }

    @GetMapping("/sin-stock")
    public List<Producto> sinStock() {
        return productoService.productosSinStock();
    }

    @GetMapping("/buscar")
    public List<Producto> buscar(@RequestParam String nombre) {
        return productoService.listarPorNombre(nombre);
    }

    @GetMapping("/top10-mas-caros")
    public List<Producto> masCaros() {
        return productoService.top10ProductosMasCaros();
    }
}
