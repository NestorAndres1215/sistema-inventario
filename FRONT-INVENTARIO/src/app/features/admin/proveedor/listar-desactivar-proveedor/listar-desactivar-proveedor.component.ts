import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { ProveedorService } from 'src/app/core/services/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-desactivar-proveedor',
  templateUrl: './listar-desactivar-proveedor.component.html',
  styleUrls: ['./listar-desactivar-proveedor.component.css']
})
export class ListarDesactivarProveedorComponent implements OnInit {

  nombre: string = '';

  proveedores: any[] = [];
  proveedoresOriginal: any[] = [];

  columnas = [
    { clave: 'nombre', etiqueta: 'Nombre' },
    { clave: 'telefono', etiqueta: 'Teléfono' },
    { clave: 'ruc', etiqueta: 'RUC' },
    { clave: 'email', etiqueta: 'Correo' },
    { clave: 'direccion', etiqueta: 'Dirección' }
  ];

  botonesConfig = {
    ver: true,
    activar: true
  };

  constructor(
    private alertService:AlertService,
    private proveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProveedoresDesactivados();
  }

  obtenerProveedoresDesactivados() {
    this.proveedorService.listarProveedoresDesactivados().subscribe({
      next: (data: any[]) => {
        this.proveedoresOriginal = data;
        this.proveedores = data;
      },
    });
  }

  buscarPorNombre() {
    const valor = this.nombre.trim().toLowerCase();

    if (!valor) {
      this.proveedores = this.proveedoresOriginal;
      return;
    }

    this.proveedores = this.proveedoresOriginal.filter(p =>
      p.nombre?.toLowerCase().includes(valor) ||
      p.ruc?.toLowerCase().includes(valor)
    );
  }

  verProveedor(item: any) {
    return ['/admin/proveedor/detalle', item.proveedorId];
  }

  activarProveedor(item: any) {
    this.proveedorService.activarProveedor(item.proveedorId).subscribe({
      next: () => {
         this.alertService.error(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);
        this.obtenerProveedoresDesactivados();
        this.router.navigate(['/admin/proveedor']);
      },
    });
  }
}

