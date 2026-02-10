package com.example.backend.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "entradas")
public class Entradas {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ent_codigo")
	private Long entradaId;

	@Column(name = "ent_numero", nullable = false, unique = true)
	private String numero;

	@Column(name = "ent_fecha_entrada", nullable = false)
	private Date fechaEntrada;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ent_fecha_registro", nullable = false)
	private Date fechaRegistro;

	@Column(name = "ent_estado", nullable = false)
	private String estado;

	@Column(name = "ent_observacion")
	private String observacion;

	@ManyToOne
	@JoinColumn(name = "ent_usuario", referencedColumnName = "us_codigo", nullable = false)
	private Usuario usuario;

	@Column(name = "ent_total", precision = 10, scale = 2)
	private BigDecimal total;
}
