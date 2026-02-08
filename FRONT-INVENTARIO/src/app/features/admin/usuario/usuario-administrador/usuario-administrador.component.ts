import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-usuario-administrador',
  templateUrl: './usuario-administrador.component.html',
  styleUrls: ['./usuario-administrador.component.css']
})
export class UsuarioAdministradorComponent implements OnInit {
  usuarioRoles: any = [];
  nombre: string = '';
  usuarioAutenticadoId: number = 1;
  constructor(private router:Router,private usuarioRolService: UsuarioService, private alertService:AlertService,private reporteSalida: ReportesService) { }
  botonesConfigTable = {
    ver: true,
    desactivar: true,
  };
  columnas = [
  { etiqueta: 'Nombre', clave: 'nombre' },
  { etiqueta: 'Apellido', clave: 'apellido' },
  { etiqueta: 'Correo', clave: 'email' },
   { etiqueta: 'Telefono', clave: 'telefono' }
];
  ngOnInit(): void {
    this.obtenerUsuarioRoles();
  }

  verUsuario(usuarioRol: any) {
    this.router.navigate(['/admin/usuario', usuarioRol.id]);
  }
  obtenerUsuarioRoles(): void {
    this.usuarioRolService.obtenerAdminUsuariosActivos()
      .subscribe({
        next: (usuarioRoles: any[]) => {
          this.usuarioRoles = usuarioRoles;
        },
      });
  }

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

          this.obtenerUsuarioRoles(); // Refresca la lista
        },
        error: (error: any) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
        }
      });
  }

  descargarPDF() {
    this.reporteSalida.descargarSalida().subscribe((data: Blob) => {
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
