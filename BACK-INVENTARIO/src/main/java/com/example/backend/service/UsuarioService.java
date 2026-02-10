package com.example.backend.service;

import com.example.backend.dto.request.UsuarioRequest;
import com.example.backend.entity.Rol;
import com.example.backend.entity.Usuario;

import java.util.List;

public interface UsuarioService {
    Usuario registrarUsuario(UsuarioRequest usuarioDTO);

    Usuario eliminarUsuario(Long usuarioId);

    Usuario activarUsuario(Long usuarioId);

    Usuario cambiarEstadoUsuario(Long usuarioId, boolean estado);



    List<Usuario> listarUsuarioAdminActivado();

    List<Usuario> listarUsuarioAdminDesactivado();

    List<Usuario> listarUsuarioNormalActivado();

    List<Usuario> listarUsuarioNormalDesactivado();

    Usuario listarPorId(Long id);

    Usuario buscarPorUsername(String username);

    List<Usuario> buscarPorNombre(String nombre);

    List<Usuario> buscarPorApellido(String apellido);

    Usuario buscarPorDni(String dni);

    List<Usuario> usuariosActivos();

    List<Usuario> usuariosInactivos();

    List<Usuario> buscarPorRolYEstado(Rol rol, boolean estado);

    Rol getRolByNombre(String nombre);

    Usuario buscarPorTelefono(String telefono);

    Usuario buscarPorEmail(String email);

    Usuario actualizarUsuario(Long id, UsuarioRequest dto);

    boolean usuarioExistePorUsername(String username);
}
