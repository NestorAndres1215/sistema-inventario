import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-usuario-administrador-desactivados',
  templateUrl: './lista-usuario-administrador-desactivados.component.html',
  styleUrls: ['./lista-usuario-administrador-desactivados.component.css']
})
export class ListaUsuarioAdministradorDesactivadosComponent implements OnInit {

  botonesConfigTable = {
    ver: true,
    desactivar: true,
  };

  usuarioRoles: any[] = [];
  
  columnas = [
    { etiqueta: 'Nombre', clave: 'nombre' },
    { etiqueta: 'Apellido', clave: 'apellido' },
    { etiqueta: 'Correo', clave: 'email' },
    { etiqueta: 'Telefono', clave: 'telefono' }
  ];
  constructor(private usuarioRolService: UsuarioService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.obtenerUsuarioRoles();
  }

  obtenerUsuarioRoles(): void {
    this.usuarioRolService.obtenerAdminUsuariosDesactivados()
      .subscribe({
        next: (usuarioRoles: any[]) => {
          this.usuarioRoles = usuarioRoles;
        },
      });
  }

  pageIndex = 0;
  pageSize = 3;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  activarUsuario(usuarioRolId: any): void {
    this.usuarioRolService.activarUsuario(usuarioRolId)
      .subscribe({
        next: () => {
          this.alertService.advertencia(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);

          this.obtenerUsuarioRoles();
        },
        error: (error) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
        }
      });
  }

}
