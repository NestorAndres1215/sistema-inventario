import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamoService } from 'src/app/core/services/reclamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reclamo-desactivados',
  templateUrl: './listar-reclamo-desactivados.component.html',
  styleUrls: ['./listar-reclamo-desactivados.component.css']
})
export class ListarReclamoDesactivadosComponent implements OnInit {

  reclamos: any[] = [];
  cargando: boolean = false;

  constructor(private reclamoService: ReclamoService, private router: Router) { }
  columnas = [
    { clave: 'reclamoId', etiqueta: 'Código' },
    { clave: 'nombre', etiqueta: 'Nombre' },
    { clave: 'correo', etiqueta: 'Correo' },
    { clave: 'asunto', etiqueta: 'Asunto' },
    { clave: 'estado', etiqueta: 'Estado' }
  ];

  botonesConfigTable = {
    activar: true,
    textoActivar: 'Reactivar'
  };

  ngOnInit(): void {
    this.obtenerReclamosDesactivados();
  }

  obtenerReclamosDesactivados() {
    this.cargando = true;
    this.reclamoService.listarReclamosDesactivados().subscribe({
      next: (data: any[]) => {
        this.reclamos = data;
        this.cargando = false;
      },
    });
  }

  verReclamo(item: any): void {
    this.router.navigate(
      ['/admin/configuracion/reclamos', item.id]
    );
  }

}
