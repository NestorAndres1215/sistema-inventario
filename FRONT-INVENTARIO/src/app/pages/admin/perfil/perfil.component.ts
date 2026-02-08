import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {

  user: any | null = null;
  datosUsuario: { clave: string; valor: any }[] = [];

  constructor(private readonly loginService: LoginService) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    if (this.user) {
      this.cargarDatosUsuario();
      this.ordenarDatosUsuario();
    }
  }

  // 🔹 Arma los datos
  private cargarDatosUsuario(): void {
    this.datosUsuario = [
      { clave: 'Nombre de usuario', valor: this.user.username },
      { clave: 'Correo', valor: this.user.email },
      { clave: 'Teléfono', valor: this.user.telefono },
      { clave: 'Rol', valor: this.user.authorities?.[0]?.authority }
    ];
  }

  // 🔹 Ordena por nombre de la clave
  private ordenarDatosUsuario(): void {
    this.datosUsuario.sort((a, b) =>
      a.clave.localeCompare(b.clave)
    );
  }
}
