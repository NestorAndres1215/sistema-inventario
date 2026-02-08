package com.example.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.backend.dto.request.ProveedorRequest;
import com.example.backend.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.entity.Proveedor;

import com.example.backend.repository.ProveedorRepository;

@RestController
@RequestMapping("/proveedor")

@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE}, allowedHeaders = "*")
@RequiredArgsConstructor
public class ProveedorController {

    private final ProveedorService proveedorService;

    @GetMapping("/ruc/{ruc}")
    public List<Proveedor> listarPorRuc(@PathVariable String ruc) {
        return proveedorService.listarPorRuc(ruc);
    }

    @GetMapping("/telefono/{telefono}")
    public List<Proveedor> listarPorTelefono(@PathVariable String telefono) {
        return proveedorService.listarPorTelefono(telefono);
    }

    @GetMapping("/email/{email}")
    public List<Proveedor> listarPorEmail(@PathVariable String email) {
        return proveedorService.listarPorEmail(email);
    }

    @GetMapping("/nombre/{nombre}")
    public List<Proveedor> listarPorNombre(@PathVariable String nombre) {
        return proveedorService.listarPorNombre(nombre);
    }

    @GetMapping
    public List<Proveedor> obtenerProveedor() {
        return proveedorService.listarTodos();
    }

    @GetMapping("/{id}")
    public Proveedor obtenerProveedorPorId(@PathVariable Long id) {
        return proveedorService.obtenerPorId(id);
    }


    @GetMapping("/desactivadas")
    public List<Proveedor> obtenerProveedorDesactivadas() {
        return proveedorService.findByEstadoIsFalse();
    }


    @GetMapping("/activadas")
    public List<Proveedor> obtenerProveedorActivadas() {
        return proveedorService.findByEstadoIsTrue();
    }

    @PostMapping("/")
    public ResponseEntity<?> agregarProveedor(@RequestBody ProveedorRequest proveedorDTO) {
        return ResponseEntity.ok(proveedorService.crearProveedor(proveedorDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizarProveedor(@RequestBody ProveedorRequest proveedorDTO) {
        return ResponseEntity.ok(proveedorService.actualizarProveedor(proveedorDTO));
    }

    @PostMapping("/activar/{id}")
    public ResponseEntity<Proveedor> activarProveedor(@PathVariable Long id) {
        return ResponseEntity.ok(proveedorService.activarProveedor(id));
    }

    @PostMapping("/desactivar/{id}")
    public ResponseEntity<Proveedor> desactivarProveedor(@PathVariable Long id) {
        return ResponseEntity.ok(proveedorService.desactivarProveedor(id));
    }

}
