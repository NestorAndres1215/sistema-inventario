import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from 'src/app/core/services/proveedor.service';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.css']
})
export class DetalleProveedorComponent implements OnInit {

  proveedor: any;
  proveedorId: number = 0;
  datosUsuario: { clave: string; valor: any }[] = [];

  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.proveedorId = this.route.snapshot.params['proveedorId'];
    this.obtenerProveedorPorId(this.proveedorId);
  }

  obtenerProveedorPorId(proveedorId: number): void {
    this.proveedorService.obtenerProveedorPorId(proveedorId).subscribe(
      (data) => {
        this.proveedor = data;

        // 👇 aquí armamos los datos para app-tabla-datos
       this.datosUsuario = [
  { clave: 'Código', valor: this.proveedor.proveedorId },
  { clave: 'Nombre', valor: this.proveedor.nombre },
  { clave: 'Teléfono', valor: this.proveedor.telefono },
  { clave: 'Correo', valor: this.proveedor.email },
  { clave: 'RUC', valor: this.proveedor.ruc },
  { clave: 'Dirección', valor: this.proveedor.direccion },
  { clave: 'Estado', valor: this.proveedor.estado ? 'Activo' : 'Desactivado' }
];


        console.log(this.datosUsuario);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
