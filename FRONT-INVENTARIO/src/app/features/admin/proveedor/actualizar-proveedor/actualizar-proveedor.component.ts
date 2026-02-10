import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProveedorService } from 'src/app/core/services/proveedor.service';

@Component({
  selector: 'app-actualizar-proveedor',
  templateUrl: './actualizar-proveedor.component.html',
  styleUrls: ['./actualizar-proveedor.component.css']
})
export class ActualizarProveedorComponent implements OnInit {

  proveedorForm!: FormGroup;
  proveedorId: number = 0;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.proveedorId = this.route.snapshot.params['proveedorId'];

    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ruc: ['', [Validators.required, Validators.pattern(/^[0-9]{11}$/)]]
    });

    this.proveedorService.obtenerProveedorPorId(this.proveedorId)
      .subscribe({
        next: (data: any) => {
          this.proveedorForm.patchValue(data);
        },
        error: (error: any) => console.error(error)
      });
  }

  actualizarProveedor(): void {
    if (this.proveedorForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos correctamente.'
      });
      return;
    }

    this.proveedorService.actualizarProveedor(this.proveedorId, this.proveedorForm.value)
      .subscribe({
        next: (respuesta: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Proveedor actualizado',
            text: 'El proveedor se ha actualizado correctamente.'
          }).then(() => this.router.navigate(['/admin/proveedor']));
        },
        error: (error: any) => {
          console.error('Error al actualizar el proveedor:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar',
            text: 'Ocurrió un error al actualizar el proveedor. Inténtelo de nuevo.'
          });
        }
      });
  }

  limitarLongitud(event: any, maxLength: number) {
    const input = event.target;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  }

  validarNumeroPositivo(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

}
