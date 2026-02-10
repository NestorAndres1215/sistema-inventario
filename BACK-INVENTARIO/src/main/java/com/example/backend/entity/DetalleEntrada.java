package com.example.backend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "detalle_entrada")
@JsonIgnoreProperties(ignoreUnknown = true)
public class DetalleEntrada {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "de_id")
	private Long detalleEntradaId;

	@Column(name = "de_cantidad", nullable = false)
	private int cantidad;

	@Column(name = "de_descripcion")
	private String descripcion;

	@Column(name = "de_precio_unitario", precision = 10, scale = 2, nullable = false)
	private BigDecimal precioUnitario;

	@Column(name = "de_subtotal", precision = 10, scale = 2)
	private BigDecimal subtotal;

	@Column(name = "de_stock_anterior")
	private int stockAnterior;

	@Column(name = "de_stock_actual")
	private int stockActual;

	@ManyToOne
	@JoinColumn(name = "de_usuario", referencedColumnName = "us_codigo", nullable = false)
	private Usuario usuario;

	@ManyToOne
	@JoinColumn(name = "de_producto", referencedColumnName = "pro_codigo", nullable = false)
	private Producto producto;

	@ManyToOne
	@JoinColumn(name = "de_entrada", referencedColumnName = "ent_codigo", nullable = false)
	private Entradas entrada;
}
