import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamoService } from 'src/app/core/services/reclamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reclamo-activados',
  templateUrl: './listar-reclamo-activados.component.html',
  styleUrls: ['./listar-reclamo-activados.component.css']
})
export class ListarReclamoActivadosComponent implements OnInit {

  reclamos: any[] = [];
  reclamosTabla: any[] = [];
  cargando = false;

columnas = [
  { etiqueta: 'Código', clave: 'id' },
  { etiqueta: 'Nombre', clave: 'nombre' },
  { etiqueta: 'Correo', clave: 'correo' },
  { etiqueta: 'Asunto', clave: 'asunto' },
  { etiqueta: 'Estado', clave: 'estado' }
];



  botonesConfigTable = {
    ver: true,
    textoVer: 'Responder',
    iconoVer: 'fas fa-reply'
  };

  constructor(
    private reclamoService: ReclamoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerReclamosActivos();
  }

  obtenerReclamosActivos(): void {
    this.cargando = true;
    this.reclamoService.listarReclamosActivos().subscribe({
      next: (data: any[]) => {
        this.reclamos = data;
        this.mapearReclamosTabla();
        this.cargando = false;
      },
    });
  }

  private mapearReclamosTabla(): void {
    this.reclamosTabla = this.reclamos.map(r => ({
      id: r.reclamoId,
      nombre: r.usuario?.nombre,
      correo: r.usuario?.email,
      asunto: r.asunto,
      estado: r.estado ? 'Recibido' : 'Enviado'
    }));
  }

  verReclamo(item: any): void {
    this.router.navigate(
      ['/admin/configuracion/reclamos', item.id]
    );
  }
}
