import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import { TITULO_MESAJES, MENSAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { Proveedor } from 'src/app/core/models/proveedor';

@Component({
  selector: 'app-crear-proveedor',
  templateUrl: './crear-proveedor.component.html',
  styleUrls: ['./crear-proveedor.component.css']
})
export class CrearProveedorComponent implements OnInit {

  proveedorForm!: FormGroup;

  constructor(
    private fb: FormBuilder, private alertService: AlertService,
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      direccion: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]],
    });
  }

  crearProveedor(): void {

    if (!this.proveedorForm.valid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.proveedorForm.markAllAsTouched();
      return;
    }


    const obj: Proveedor = {
      nombre: this.proveedorForm.value.nombre,
      email: this.proveedorForm.value.email,
      telefono: this.proveedorForm.value.telefono,
      direccion: this.proveedorForm.value.direccion,
      ruc: this.proveedorForm.value.ruc
    };
    this.proveedorService.agregarProveedor(obj)
      .subscribe({
        next: () => {
          this.alertService.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
          this.router.navigate(['/admin/proveedor']);
        },
        error: (error: any) => {
          this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
        }
      });
  }




}
