import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/models/usuario';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';

@Component({
  selector: 'app-registrar-usuario-operador',
  templateUrl: './registrar-usuario-operador.component.html',
  styleUrls: ['./registrar-usuario-operador.component.css'],
})
export class RegistrarUsuarioOperadorComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private userService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      direccion: ['', Validators.required],
      fechaNacimiento: [''],
      edad: ['']
    });
  }


  formSubmit() {
    console.log(this.form.value)
    if (!this.form.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.form.markAllAsTouched();
      return;
    }

    const user: Usuario = {
      username: 'O' + this.form.value.dni,
      password: this.form.value.dni + 'O',
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      telefono: this.form.value.telefono,
      dni: this.form.value.dni,
      direccion: this.form.value.direccion,
      fechaNacimiento: this.form.value.fechaNacimiento,
      edad: this.form.value.edad,
      rol: 'NORMAL'
    };
    this.userService.registrarNormal(user).subscribe({
      next: () => {
        this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
        this.router.navigate(['/admin/usuario/operador']);
      },
      error: (error) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      },
    });

  }

}
