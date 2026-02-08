import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { ReportesService } from 'src/app/core/services/reportes.service';

import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario-operador',
  templateUrl: './usuario-operador.component.html',
  styleUrls: ['./usuario-operador.component.css']
})
export class UsuarioOperadorComponent implements OnInit {
  usuarioRoles: any[] = [];

  constructor(
    private usuarioRolService: UsuarioService,
    private alertService: AlertService,
    private router: Router,
    private reporteSalida: ReportesService) { }

  ngOnInit(): void {
    this.obtenerUsuarioRoles();
  }
  
  botonesConfigTable = {
    ver: true,
    desactivar: true,
  };

  verUsuario(usuarioRol: any) {
    this.router.navigate(['/admin/usuario', usuarioRol.id]);
  }

  obtenerUsuarioRoles(): void {
    this.usuarioRolService.obtenerUsuariosNormalesActivos()
      .subscribe({
        next: (usuarioRoles: any[]) => {
          this.usuarioRoles = usuarioRoles;
        },
      });
  }

  columnas = [
    { etiqueta: 'Nombre', clave: 'nombre' },
    { etiqueta: 'Apellido', clave: 'apellido' },
    { etiqueta: 'Correo', clave: 'email' },
    { etiqueta: 'Telefono', clave: 'telefono' }
  ];

  pageSize = 3;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  desactivarUsuario(usuarioRolId: any): void {
    this.usuarioRolService.desactivarUsuario(usuarioRolId)
      .subscribe({
        next: () => {
          this.alertService.advertencia(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);
          this.obtenerUsuarioRoles();
        },
        error: (error: any) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
        }
      });
  }

  descargarPDF() {
    this.reporteSalida.descargarUsuarioOperador().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_salidas_productos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }
}
