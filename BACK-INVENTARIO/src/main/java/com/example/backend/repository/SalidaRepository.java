package com.example.backend.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.backend.entity.Salidas;

public interface SalidaRepository extends JpaRepository<Salidas, Long> {
	Optional<Salidas> findByFechaSalida(LocalDate fecha);
}
