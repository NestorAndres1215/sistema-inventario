import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { Salida } from 'src/app/core/models/detalle-salidad';
import { AlertService } from 'src/app/core/services/alert.service';

import { LoginService } from 'src/app/core/services/login.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import { SalidaService } from 'src/app/core/services/salida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-salidas',
  templateUrl: './registrar-salidas.component.html',
  styleUrls: ['./registrar-salidas.component.css']
})
export class RegistrarSalidasComponent implements OnInit {

  salidaForm!: FormGroup;
  productos: any[] = [];
  listaDetalleSalida: any[] = [];
  user: any = null;
  producto: any;
  isLoggedIn: any;

  constructor(
    private fb: FormBuilder,
    private alertSerrvice: AlertService,
    private productoService: ProductoService,
    private loginService: LoginService,
    private salidaService: SalidaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.salidaForm = this.fb.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      fechaSalida: ['', Validators.required]
    });

    this.obtenerProducto();
    this.obtenerUsuario();
  }

  obtenerProducto(): void {
    this.productoService.listarProductosActivos().subscribe({
      next: (data) => {
        this.productos = data
      },
    });
  }

  obtenerUsuario(): void {
    this.user = this.loginService.getUser();
  }

  agregarProducto(): void {
    if (this.salidaForm.invalid) {
      this.alertSerrvice.advertencia(TITULO_MESAJES.ADVERTENCIA, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      return;
    }

    const { producto, descripcion, cantidad, fechaSalida } = this.salidaForm.value;

    if (this.listaDetalleSalida.some(d => d.producto.nombre === producto)) {
      this.alertSerrvice.advertencia(TITULO_MESAJES.ADVERTENCIA, "PRODUCTO YA HA SIDO REGISTRADO");
      return;
    }



    console.log(this.loginService.getUser())
    const detalle: Salida = {
      cantidad: cantidad,
      descripcion: descripcion,
      usuario: this.loginService.getUser().username,
      producto: producto.nombre,
      fechaSalida: fechaSalida
    };

    this.listaDetalleSalida.push(detalle);


    this.alertSerrvice.aceptacion(TITULO_MESAJES.REGISTRO_EXITOSO_TITULO, MENSAJES.REGISTRO_EXITOSO_MENSAJE);
    this.salidaForm.reset({ fechaSalida }); 
  }

  enviarSalida(): void {
    if (this.listaDetalleSalida.length === 0) {
      this.alertSerrvice.advertencia('Sin registros', 'Agregue al menos un producto antes de enviar.');
      return;
    }

    this.salidaService.crearSalidaConDetalles(this.listaDetalleSalida)
      .subscribe({
        next: () => {
         this.alertSerrvice.aceptacion('Éxito', 'La salida se ha registrado correctamente');
          this.listaDetalleSalida = [];
          this.salidaForm.reset();
          this.router.navigate(['/admin/salidas']);
        },
        error: (err) => {
          this.alertSerrvice.error('Error', 'Hubo un problema al registrar la salida');
        }
      });
  }
}
