import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
@Component({
  selector: 'app-listar-producto-activadas',
  templateUrl: './listar-producto-activadas.component.html',
  styleUrls: ['./listar-producto-activadas.component.css']
})
export class ListarProductoActivadasComponent implements OnInit {
  nombre: string = '';
  producto: any = [];
  categoriaId: string = '';
  proveedorId: string = '';
  productos: any[] = [];
  productoId: string = '';

  constructor(private alertService: AlertService,
    private productoService: ProductoService,
    private reporteSalida: ReportesService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerProducto();
  }

  columnas = [
    { clave: 'productoId', etiqueta: 'Código' },
    { clave: 'nombre', etiqueta: 'Nombre' },
    { clave: 'descripcion', etiqueta: 'Descripción' },
    { clave: 'precio', etiqueta: 'Precio' },
    { clave: 'stock', etiqueta: 'Stock' },
    { clave: 'ubicacion', etiqueta: 'Ubicación' },
    { clave: 'proveedor.nombre', etiqueta: 'Proveedor' }
  ];

  botonesConfig = {
    ver: true,
    editar: true,
    desactivar: true
  };

  obtenerProducto() {
    this.productoService.listarProductosActivos().subscribe(
      (productos: any) => {
        this.productos = productos;
      },
    );
  }

  pageSize = 6;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  desactivarProducto(productoId: any): void {
    this.productoService.desactivarProducto(productoId).subscribe(
      () => {
        this.alertService.aceptacion(TITULO_MESAJES.DESACTIVADO, MENSAJES.DESACTIVADO);

        this.obtenerProducto();
      },
    );
  }

  buscarPorNombre() {
    if (this.nombre && this.productos) {
      this.productos = this.productos.filter((proveedor: any) =>
        proveedor.nombre.toLowerCase().includes(this.nombre.toLowerCase())
      );
    } else {
      this.restaurarProveedores();
    }
  }

  restaurarProveedores() {
    this.nombre = '';
    this.productoService.listarProductosActivos().subscribe(
      (proveedores: any) => {
        this.productos = proveedores;
      },
    );
  }

  verProducto(producto: any) {
    console.log(producto)
    this.router.navigate(['/admin/producto/detalle', producto.productoId]);
  }

  descargarPDF() {
    this.reporteSalida.descargarProducto().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_productos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }
}
