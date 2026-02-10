import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';

import { ProveedorService } from 'src/app/core/services/proveedor.service';
import { ReportesService } from 'src/app/core/services/reportes.service';

@Component({
  selector: 'app-listar-activadas-proveedor',
  templateUrl: './listar-activadas-proveedor.component.html',
  styleUrls: ['./listar-activadas-proveedor.component.css']
})
export class ListarActivadasProveedorComponent implements OnInit {
  nombre: string = '';
  ruc: string = '';
  proveedores: any[] = [];
  columnas = [
    { clave: 'nombre', etiqueta: 'Nombre' },
    { clave: 'telefono', etiqueta: 'Teléfono' },
    { clave: 'ruc', etiqueta: 'RUC' },
    { clave: 'email', etiqueta: 'Correo' },
    { clave: 'direccion', etiqueta: 'Dirección' }
  ];

  botonesConfig = {
    ver: true,
    editar: true,
    desactivar: true
  };

verProveedor(item: any) {
  this.router.navigate([
    '/admin/proveedor/detalle',
    item.proveedorId
  ]);
}

  editarProveedor(item: any) {
    return ['/admin/proveedor', item.proveedorId];
  }

  proveedorId: string = '';
  productos: any;

  constructor(private alertService: AlertService,private router:Router ,private proveedorService: ProveedorService, private reporteSalida: ReportesService) { }

  ngOnInit(): void {
    this.obtenerProveedr();
  }

  obtenerProveedr() {
    this.proveedorService.listarProveedoresActivos().subscribe(
      (marcas: any) => {
        this.proveedores = marcas;
      }
    );
  }
  buscarPorNombre() {

    if (this.nombre && this.proveedores) {
      this.proveedores = this.proveedores.filter((proveedor: any) =>
        proveedor.nombre.toLowerCase().includes(this.nombre.toLowerCase()) ||
        proveedor.ruc.toLowerCase().includes(this.nombre.toLowerCase())
      );
    } else {
      this.restaurarProveedores();
    }

  }
  restaurarProveedores() {
    this.nombre = '';

    this.proveedorService.listarProveedoresActivos().subscribe(
      (proveedores: any) => {
        this.proveedores = proveedores;
      },
    );
  }
  desactivarProveedor(proveedorId: any): void {
    this.proveedorService.desactivarProveedor(proveedorId).subscribe(
      () => {


        this.alertService.error(TITULO_MESAJES.DESACTIVADO, MENSAJES.ACTIVADO);
        this.obtenerProveedr();
      },
      (error: any) => {
        this.alertService.error(TITULO_MESAJES.ERROR_TITULO, error.error.message);
      }
    );
  }
  pageSize = 5;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  descargarPDF() {
    this.reporteSalida.descargarProveedor().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_proveedor.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }

}
