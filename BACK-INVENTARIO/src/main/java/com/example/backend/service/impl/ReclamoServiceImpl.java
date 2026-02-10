package com.example.backend.service.impl;

import com.example.backend.constants.NotFoundMessages;
import com.example.backend.dto.request.ReclamosRequest;
import com.example.backend.entity.Reclamos;
import com.example.backend.entity.Usuario;
import com.example.backend.repository.ReclamoRepository;
import com.example.backend.service.ReclamoService;
import com.example.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReclamoServiceImpl implements ReclamoService {

    private final JavaMailSender javaMailSender;
    private final ReclamoRepository reclamoRepository;
    private final UsuarioService usuarioService;
    private static final String ASUNTO_DISCULPAS = "Respuesta de disculpas para el reclamo #%d";
    private static final String SALUDO = "Estimado/a %s %s,\n\n";
    private static final String CUERPO_DISCULPAS = "Lamentamos profundamente los inconvenientes ocasionados por su reclamo. "
            + "Queremos ofrecerle nuestras más sinceras disculpas y asegurarle que estamos trabajando para resolver la situación lo antes posible.\n\n";
    private static final String MENSAJE_DISCULPAS = "Mensaje de disculpas: %s\n\n";
    private static final String FIRMA = "--------------------------\nAtentamente,\nEquipo de Soporte";


    @Override
    public List<Reclamos> obtenerTodosLosReclamos() {
        return reclamoRepository.findAll();
    }

    @Override
    public Reclamos agregarReclamo(ReclamosRequest request) {
        Usuario usuario = usuarioService.listarPorId(request.getCodigo());
        Reclamos reclamo = Reclamos.builder()
                .asunto(request.getAsunto())
                .usuario(usuario)
                .estado(true)
                .build();
        return reclamoRepository.save(reclamo);
    }

    @Override
    public Reclamos obtenerReclamoPorId(Long id) {
        return reclamoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(NotFoundMessages.RECLAMO_NO_ENCONTRADO));
    }


    @Override
    public Reclamos actualizarReclamo(Reclamos reclamo) {
        return reclamoRepository.save(reclamo);
    }

    @Override
    public Reclamos enviarDisculpasReclamo(Long id, String mensaje) {
        Reclamos reclamo = obtenerReclamoPorId(id);
        if (reclamo == null) return null;

        String destinatario = reclamo.getUsuario().getEmail();
        String asunto = String.format(ASUNTO_DISCULPAS, id);
        String contenido = String.format(SALUDO, reclamo.getUsuario().getNombre(), reclamo.getUsuario().getApellido())
                + CUERPO_DISCULPAS
                + String.format(MENSAJE_DISCULPAS, mensaje)
                + FIRMA;

        enviarCorreo(destinatario, asunto, contenido);

        reclamo.setEstado(false);
        return actualizarReclamo(reclamo);
    }

    private void enviarCorreo(String destinatario, String asunto, String contenido) {
        SimpleMailMessage correo = new SimpleMailMessage();
        correo.setTo(destinatario);
        correo.setSubject(asunto);
        correo.setText(contenido);
        javaMailSender.send(correo);
    }


    @Override
    public Reclamos desactivarReclamo(Long id) {
        return cambiarEstadoReclamo(id, false);
    }

    @Override
    public Reclamos activarReclamo(Long id) {
        return cambiarEstadoReclamo(id, true);
    }

    @Override
    public Reclamos cambiarEstadoReclamo(Long id, boolean estado) {
        Reclamos reclamo = obtenerReclamoPorId(id);
        reclamo.setEstado(estado);
        return actualizarReclamo(reclamo);
    }

    @Override
    public List<Reclamos> obtenerReclamosDesactivados() {
        return reclamoRepository.findByEstadoIsFalse();
    }

    @Override
    public List<Reclamos> obtenerReclamosActivados() {
        return reclamoRepository.findByEstadoIsTrue();
    }
}
