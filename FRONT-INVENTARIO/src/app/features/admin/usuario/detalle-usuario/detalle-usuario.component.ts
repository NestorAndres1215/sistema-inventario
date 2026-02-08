import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  usuarioRol: any;
  usuarioRolId!: number;
  datosUsuario: { clave: string; valor: any }[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuarioRolId = Number(this.route.snapshot.params['id']);
    this.obtenerUsuarioPorId(this.usuarioRolId);
  }

  obtenerUsuarioPorId(usuarioRolId: number): void {
    this.usuarioService.obtenerUsuarioPorId(usuarioRolId)
      .subscribe({
        next: (data) => {
          this.usuarioRol = data;
          this.armarDatosUsuario();
        },
        error: (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      });
  }

  // Construye datosUsuario dinámicamente después de recibir los datos
  armarDatosUsuario() {
    if (!this.usuarioRol) return;

    this.datosUsuario = [
      { clave: 'Código', valor: this.usuarioRol.id },
      { clave: 'Nombre', valor: this.usuarioRol.nombre },
      { clave: 'Apellido', valor: this.usuarioRol.apellido },
      { clave: 'Correo', valor: this.usuarioRol.email },
      { clave: 'Teléfono', valor: this.usuarioRol.telefono },
      { clave: 'Usuario', valor: this.usuarioRol.username }
    ];
  }
}
