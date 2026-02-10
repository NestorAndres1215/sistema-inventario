package com.example.backend.service.impl;

import com.example.backend.constants.NotFoundMessages;
import com.example.backend.dto.request.SalidasRequest;
import com.example.backend.entity.DetalleSalida;
import com.example.backend.entity.Producto;
import com.example.backend.entity.Salidas;
import com.example.backend.entity.Usuario;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.Detalle_SalidaRepository;
import com.example.backend.repository.ProductoRepository;
import com.example.backend.repository.SalidaRepository;
import com.example.backend.repository.UsuarioRepository;
import com.example.backend.service.SalidaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SalidaServiceImpl implements SalidaService {

    private final Detalle_SalidaRepository detalle_SalidaRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final SalidaRepository salidaRepository;

    @Override
    public List<DetalleSalida> crearDetalleSalida(List<SalidasRequest> listaDetalleSalida) {

        List<DetalleSalida> detallesAGuardar = new ArrayList<>();
        BigDecimal totalSalida = BigDecimal.ZERO;
        SalidasRequest primerDetalle = listaDetalleSalida.get(0);
        Usuario usuario = usuarioRepository.findByUsername(primerDetalle.getUsuario())
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.USUARIO_NO_ENCONTRADO));

        Salidas salida = Salidas.builder()
                .usuario(usuario)
                .numero(primerDetalle.getNumero())
                .observacion(primerDetalle.getObservaciones())
                .fechaSalida(primerDetalle.getFechaSalida())
                .total(BigDecimal.ZERO)
                .build();

        salida = salidaRepository.save(salida);


        for (SalidasRequest detalle : listaDetalleSalida) {

            Producto producto = productoRepository.findByNombre(detalle.getProducto())
                    .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.PRODUCTO_NO_ENCONTRADO));

            int stockAnterior = producto.getStock();
            int stockActual = stockAnterior - detalle.getCantidad();

            BigDecimal subtotal = detalle.getPrecioUnitario().multiply(BigDecimal.valueOf(detalle.getCantidad()));

            totalSalida = totalSalida.add(subtotal);

            DetalleSalida detalleSalida = DetalleSalida.builder()
                    .cantidad(detalle.getCantidad())
                    .descripcion(detalle.getDescripcion())
                    .precioUnitario(detalle.getPrecioUnitario())
                    .subtotal(subtotal)
                    .stockAnterior(stockAnterior)
                    .stockActual(stockActual)
                    .usuario(usuario)
                    .producto(producto)
                    .salida(salida)
                    .build();

            detallesAGuardar.add(detalleSalida);

            producto.setStock(stockActual);
            productoRepository.save(producto);
        }

        detalle_SalidaRepository.saveAll(detallesAGuardar);

        salida.setTotal(totalSalida);
        salidaRepository.save(salida);

        return detallesAGuardar;
    }

    @Override
    public DetalleSalida obtenerPorId(Long id) {
        return detalle_SalidaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(NotFoundMessages.SALIDA_NO_ENCONTRADO));
    }

    @Override
    public List<DetalleSalida> obtenerTodas() {
        return detalle_SalidaRepository.findAll();
    }

}
