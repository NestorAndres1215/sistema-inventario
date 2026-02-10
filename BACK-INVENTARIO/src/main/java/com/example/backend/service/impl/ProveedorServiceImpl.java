package com.example.backend.service.impl;

import com.example.backend.constants.AlreadyExistsMessages;
import com.example.backend.constants.NotFoundMessages;
import com.example.backend.dto.request.ProveedorRequest;
import com.example.backend.entity.Proveedor;
import com.example.backend.exception.ResourceAlreadyExistsException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.ProveedorRepository;
import com.example.backend.service.ProveedorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ProveedorServiceImpl implements ProveedorService {

    private final ProveedorRepository proveedorRepository;

    @Override
    public Proveedor crearProveedor(ProveedorRequest proveedorDTO) {
        validarUnicidadProveedor(proveedorDTO);
        Proveedor proveedor = Proveedor.builder()
                .nombre(proveedorDTO.getNombre())
                .ruc(proveedorDTO.getRuc())
                .direccion(proveedorDTO.getDireccion())
                .telefono(proveedorDTO.getTelefono())
                .email(proveedorDTO.getEmail())
                .fechaRegistro(LocalDate.now())
                .contacto("")
                .estado(true)
                .build();

        return proveedorRepository.save(proveedor);
    }

    @Override
    public Proveedor actualizarProveedor(ProveedorRequest proveedorDTO) {

        Proveedor proveedor = proveedorRepository.findById(proveedorDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PROVEEDOR_NO_ENCONTRADO));

        validarUnicidadProveedorActualizacion(proveedor, proveedorDTO);
        proveedor.setNombre(proveedorDTO.getNombre());
        proveedor.setRuc(proveedorDTO.getRuc());
        proveedor.setDireccion(proveedorDTO.getDireccion());
        proveedor.setTelefono(proveedorDTO.getTelefono());
        proveedor.setEmail(proveedorDTO.getEmail());

        return proveedorRepository.save(proveedor);
    }

    @Override
    public List<Proveedor> listarTodos() {
        return proveedorRepository.findAll();
    }

    @Override
    public List<Proveedor> listarPorRuc(String ruc) {
        return proveedorRepository.findByRuc(ruc);
    }

    @Override
    public List<Proveedor> listarPorNombre(String nombre) {
        return proveedorRepository.findByNombre(nombre);
    }

    @Override
    public List<Proveedor> listarPorTelefono(String telefono) {
        return proveedorRepository.findByTelefono(telefono);
    }

    @Override
    public List<Proveedor> listarPorEmail(String email) {
        return proveedorRepository.findByEmail(email);
    }

    @Override
    public List<Proveedor> findByEstadoIsTrue() {
        return proveedorRepository.findByEstadoIsTrue();
    }

    @Override
    public List<Proveedor> findByEstadoIsFalse() {
        return proveedorRepository.findByEstadoIsFalse();
    }

    @Override
    public Proveedor obtenerPorId(Long id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.PROVEEDOR_NO_ENCONTRADO)
                );
    }

    public Proveedor activarProveedor(Long id) {
        return cambiarEstadoProveedor(id, true);
    }

    public Proveedor desactivarProveedor(Long id) {
        return cambiarEstadoProveedor(id, false);
    }
    private Proveedor cambiarEstadoProveedor(Long id, boolean estado) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PROVEEDOR_NO_ENCONTRADO));

        proveedor.setEstado(estado);
        return proveedorRepository.save(proveedor);
    }


    private void validarUnicidadProveedor(ProveedorRequest proveedorDTO) {
        if (proveedorRepository.existsByRuc(proveedorDTO.getRuc())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.RUC_YA_EXISTE);
        }

        if (proveedorRepository.existsByEmail(proveedorDTO.getEmail())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CORREO_YA_EXISTE);
        }

        if (proveedorRepository.existsByTelefono(proveedorDTO.getTelefono())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.TELEFONO_YA_EXISTE);
        }
    }


    private void validarUnicidadProveedorActualizacion(Proveedor proveedorExistente, ProveedorRequest proveedorDTO) {

        // Validar RUC solo si cambió
        if (!proveedorExistente.getRuc().equals(proveedorDTO.getRuc())) {
            List<Proveedor> proveedoresConRuc = proveedorRepository.findByRuc(proveedorDTO.getRuc());
            if (!proveedoresConRuc.isEmpty()) {
                throw new ResourceAlreadyExistsException(AlreadyExistsMessages.RUC_YA_EXISTE);
            }
        }

        if (!proveedorExistente.getEmail().equals(proveedorDTO.getEmail())) {
            List<Proveedor> proveedoresConEmail = proveedorRepository.findByEmail(proveedorDTO.getEmail());
            if (!proveedoresConEmail.isEmpty()) {
                throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CORREO_YA_EXISTE);
            }
        }

        if (!proveedorExistente.getTelefono().equals(proveedorDTO.getTelefono())) {
            List<Proveedor> proveedoresConTelefono = proveedorRepository.findByTelefono(proveedorDTO.getTelefono());
            if (!proveedoresConTelefono.isEmpty()) {
                throw new ResourceAlreadyExistsException(AlreadyExistsMessages.TELEFONO_YA_EXISTE);
            }
        }
    }


}
