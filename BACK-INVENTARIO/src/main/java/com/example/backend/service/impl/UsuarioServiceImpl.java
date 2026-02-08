package com.example.backend.service.impl;

import com.example.backend.constants.AlreadyExistsMessages;
import com.example.backend.constants.NotFoundMessages;
import com.example.backend.dto.request.UsuarioRequest;
import com.example.backend.entity.Rol;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.ResourceAlreadyExistsException;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.RolRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RolRepository rolRepository;

    @Override
    public Usuario registrarUsuario(UsuarioRequest usuarioDTO) {
        validarUsuario(usuarioDTO);

        Rol rol = rolRepository.findByNombre(usuarioDTO.getRol())
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.ROL_NO_ENCONTRADO)
                );

        Usuario usuario = Usuario.builder()
                .username(usuarioDTO.getUsername())
                .password(bCryptPasswordEncoder.encode(usuarioDTO.getPassword()))
                .nombre(usuarioDTO.getNombre())
                .apellido(usuarioDTO.getApellido())
                .email(usuarioDTO.getEmail())
                .telefono(usuarioDTO.getTelefono())
                .direccion(usuarioDTO.getDireccion())
                .dni(usuarioDTO.getDni())
                .edad(usuarioDTO.getEdad())
                .fechaNacimiento(usuarioDTO.getFechaNacimiento())
                .fechaRegistro(LocalDate.now())
                .estado(true)
                .rol(rol)
                .build();

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario actualizarUsuario(Long id, UsuarioRequest dto) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

        validarCamposUnicosAlActualizar(usuario, dto);

        usuario.setUsername(dto.getUsername());
        usuario.setNombre(dto.getNombre());
        usuario.setApellido(dto.getApellido());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefono(dto.getTelefono());
        usuario.setDireccion(dto.getDireccion());
        usuario.setDni(dto.getDni());
        usuario.setEdad(dto.getEdad());
        usuario.setFechaNacimiento(dto.getFechaNacimiento());

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            usuario.setPassword(bCryptPasswordEncoder.encode(dto.getPassword()));
        }

        if (dto.getRol() != null) {
            Rol rol = rolRepository.findByNombre(dto.getRol())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.ROL_NO_ENCONTRADO));
            usuario.setRol(rol);
        }

        return usuarioRepository.save(usuario);
    }


    private void validarCamposUnicosAlActualizar(Usuario usuario, UsuarioRequest dto) {

        if (dto.getUsername() != null && !dto.getUsername().equals(usuario.getUsername()) && usuarioRepository.existsByUsername(dto.getUsername())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.USUARIO_YA_EXISTE);
        }
        if (dto.getEmail() != null && !dto.getEmail().equals(usuario.getEmail()) && usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CORREO_YA_EXISTE);
        }

        if (dto.getTelefono() != null && !dto.getTelefono().equals(usuario.getTelefono()) && usuarioRepository.existsByTelefono(dto.getTelefono())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.TELEFONO_YA_EXISTE);
        }

        if (dto.getDni() != null && !dto.getDni().equals(usuario.getDni()) && usuarioRepository.existsByDni(dto.getDni())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DNI_YA_EXISTE);
        }
    }

    @Override
    public Usuario eliminarUsuario(Long usuarioId) {
        return cambiarEstadoUsuario(usuarioId, false);
    }

    @Override
    public Usuario activarUsuario(Long usuarioId) {
        return cambiarEstadoUsuario(usuarioId, true);
    }

    @Override
    public Usuario cambiarEstadoUsuario(Long usuarioId, boolean estado) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO)
                );

        usuario.setEstado(estado);
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario listarCodigo(String codigo) {
        return usuarioRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
    }

    @Override
    public List<Usuario> listarUsuarioAdminActivado() {
        return usuarioRepository.listarUsuarioAdminActivado();
    }

    @Override
    public List<Usuario> listarUsuarioAdminDesactivado() {
        return usuarioRepository.listarUsuarioAdminDesactivado();
    }


    @Override
    public List<Usuario> listarUsuarioNormalActivado() {
        return usuarioRepository.listarUsuarioNormalActivado();
    }


    @Override
    public List<Usuario> listarUsuarioNormalDesactivado() {
        return usuarioRepository.listarUsuarioNormalDesactivado();
    }


    @Override
    public Usuario listarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));
    }

    @Override
    public Usuario buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO)
                );
    }

    @Override
    public List<Usuario> buscarPorNombre(String nombre) {
        return usuarioRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public List<Usuario> buscarPorApellido(String apellido) {
        return usuarioRepository.findByApellidoContainingIgnoreCase(apellido);
    }

    @Override
    public Usuario buscarPorDni(String dni) {
        return usuarioRepository.findByDni(dni)
                .orElseThrow(() ->
                        new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO)
                );
    }

    @Override
    public List<Usuario> usuariosActivos() {
        return usuarioRepository.findByEstadoTrue();
    }

    @Override
    public List<Usuario> usuariosInactivos() {
        return usuarioRepository.findByEstadoFalse();
    }

    @Override
    public List<Usuario> buscarPorRolYEstado(Rol rol, boolean estado) {
        return usuarioRepository.findByRolAndEstado(rol, estado);
    }


    @Override
    public Rol getRolByNombre(String nombre) {
        return rolRepository.findByNombre(nombre)
                .orElseThrow(() -> new ResourceNotFoundException(
                        NotFoundMessages.ROL_NO_ENCONTRADO
                ));
    }

    @Override
    public Usuario buscarPorTelefono(String telefono) {
        return usuarioRepository.findByTelefono(telefono)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                NotFoundMessages.USUARIO_NO_ENCONTRADO
                        )
                );
    }

    @Override
    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                NotFoundMessages.USUARIO_NO_ENCONTRADO
                        )
                );
    }


    private void validarUsuario(UsuarioRequest dto) {
        if (usuarioExistePorUsername(dto.getUsername())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.USUARIO_YA_EXISTE);
        }
        if (usuarioExistePorCorreo(dto.getEmail())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.CORREO_YA_EXISTE);
        }
        if (usuarioExistePorTelefono(dto.getTelefono())) {
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.TELEFONO_YA_EXISTE);
        }
        if (usuarioExistePorDni(dto.getDni())) { // ← validación DNI
            throw new ResourceAlreadyExistsException(AlreadyExistsMessages.DNI_YA_EXISTE);
        }

    }


    public boolean usuarioExistePorUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public boolean usuarioExistePorCorreo(String correo) {
        return usuarioRepository.existsByEmail(correo);
    }

    public boolean usuarioExistePorTelefono(String telefono) {
        return usuarioRepository.existsByTelefono(telefono);
    }

    public boolean usuarioExistePorDni(String dni) {
        return usuarioRepository.existsByDni(dni);
    }
}
