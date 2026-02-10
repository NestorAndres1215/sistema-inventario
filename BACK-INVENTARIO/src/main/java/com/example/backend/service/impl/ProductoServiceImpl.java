package com.example.backend.service.impl;

import com.example.backend.constants.NotFoundMessages;
import com.example.backend.dto.request.ProductoRequest;
import com.example.backend.entity.Producto;
import com.example.backend.entity.Proveedor;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ProductoRepository;
import com.example.backend.repository.ProveedorRepository;
import com.example.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository;

    @Override
    public List<Producto> obtenerTodosLosProductos() {
        return productoRepository.findAll();
    }

    @Override
    public List<Producto> obtenerProductosActivados() {
        return productoRepository.findByEstadoIsTrue();
    }

    @Override
    public List<Producto> obtenerProductosDesactivados() {
        return productoRepository.findByEstadoIsFalse();
    }

    @Override
    public Producto obtenerProductoPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PRODUCTO_NO_ENCONTRADO));
    }

    @Override
    public Producto activarProducto(Long id) {
        return cambiarEstadoProducto(id, true);
    }

    @Override
    public Producto desactivarProducto(Long id) {
        return cambiarEstadoProducto(id, false);
    }


    private Producto cambiarEstadoProducto(Long id, boolean activo) {
        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setEstado(activo);
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> new ResourceNotFoundException((NotFoundMessages.PRODUCTO_NO_ENCONTRADO)));
    }

    @Override
    public Producto agregarProducto(ProductoRequest productoDTO) {

        Proveedor proveedor = proveedorRepository.findById(productoDTO.getProveedorId())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PROVEEDOR_NO_ENCONTRADO));

        Producto producto = Producto.builder()
                .nombre(productoDTO.getNombre())
                .precio(productoDTO.getPrecio())
                .descripcion(productoDTO.getDescripcion())
                .ubicacion(productoDTO.getUbicacion())
                .stock(productoDTO.getStock())
                .estado(true)
                .proveedor(proveedor)
                .fechaRegistro(LocalDate.now())
                .build();

        return productoRepository.save(producto);
    }


    @Override
    public Producto actualizarProducto(ProductoRequest productoDTO) {

        Producto producto = productoRepository.findById(productoDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PRODUCTO_NO_ENCONTRADO));

        Proveedor proveedor = proveedorRepository.findById(productoDTO.getProveedorId())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PROVEEDOR_NO_ENCONTRADO));

        producto.setNombre(productoDTO.getNombre());
        producto.setPrecio(productoDTO.getPrecio());
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setUbicacion(productoDTO.getUbicacion());
        producto.setStock(productoDTO.getStock());
        producto.setProveedor(proveedor);

        return productoRepository.save(producto);
    }



    @Override
    public List<Producto> listarProductosPorProveedor(Long proveedorId) {
        return productoRepository.findByProveedorProveedorId(proveedorId);
    }

    @Override
    public List<Producto> top10ProductosMasBaratos() {
        return productoRepository.findTop10ByOrderByPrecioDesc();
    }

    @Override
    public List<Producto> top10ProductosMasCaros() {
        return productoRepository.findTop10ByOrderByPrecioAsc();
    }

    @Override
    public List<Producto> listarPorNombre(String nombre) {
        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public List<Producto> top10ProductosMasBaratosActivos() {
        return productoRepository.findTop10ByEstadoIsTrueOrderByPrecioDesc();
    }

    @Override
    public List<Producto> top10ProductosMasCarosActivos() {
        return productoRepository.findTop10ByEstadoIsTrueOrderByPrecioAsc();
    }

    @Override
    public Producto productoConMayorStock() {
        return productoRepository.findTopByOrderByStockDesc();
    }

    @Override
    public Producto productoConMenorStock() {
        return productoRepository.findTopByOrderByStockAsc();
    }


    @Override
    public List<Producto> productosConStockBajo(int limite) {
        return productoRepository.findByStockLessThanEqual(limite);
    }

    @Override
    public List<Producto> productosSinStock() {
        return productoRepository.findByStockEquals(0);
    }


}
