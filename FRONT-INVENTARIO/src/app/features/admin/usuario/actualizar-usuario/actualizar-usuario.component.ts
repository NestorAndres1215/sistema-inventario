import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { LoginService } from 'src/app/core/services/login.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit {

  user: any = null;
  id!: number;

  constructor(
    private router: Router, private alertService: AlertService,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    if (!this.user || !this.user.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.id = Number(this.user.id);
  }

  actualizarUsuario(): void {
    if (!this.id || !this.user) {
      return;
    }

    this.usuarioService.actualizarUsuario(this.id, this.user)
      .subscribe({
        next: () => {
          this.alertService.aceptacion(TITULO_MESAJES.ACTUALIZAR_EXITOSO_TITULO, MENSAJES.ACTUALIZAR_EXITOSO_MENSAJE);
          this.router.navigate(['/user-dashboard/configuracion']);
        },
        error: (error) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
        }
      });
  }
}
