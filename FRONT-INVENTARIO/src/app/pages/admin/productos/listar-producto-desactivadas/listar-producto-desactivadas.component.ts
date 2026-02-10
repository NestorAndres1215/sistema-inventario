import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { AlertService } from 'src/app/core/services/alert.service';
import { ProductoService } from 'src/app/core/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-producto-desactivadas',
  templateUrl: './listar-producto-desactivadas.component.html',
  styleUrls: ['./listar-producto-desactivadas.component.css']
})
export class ListarProductoDesactivadasComponent implements OnInit {

  nombre: string = '';
  producto: any = [];
  categoriaId: string = '';
  proveedorId: string = '';
  productos: any[] = [];

  constructor(private alertService: AlertService,
    private productoService: ProductoService,
    private router: Router) { }

    botonesConfig = {
  ver: true,
  activar: true
};
  ngOnInit(): void {
    this.obtenerProducto();
  }

  verProducto(producto: any) {
  this.router.navigate(['/admin/producto/detalle', producto.productoId]);
}


  buscarPorNombre() {

      if (this.nombre && this.productos) {
        this.productos = this.productos.filter((proveedor: any) =>
          proveedor.nombre.toLowerCase().includes(this.nombre.toLowerCase())
        );
      } else {
        this.restaurarProveedores();
        console.log("Ingrese un nombre o RUC para buscar.");
      }

  }
  columnas = [
    { clave: 'productoId', etiqueta: 'Código' },
    { clave: 'nombre', etiqueta: 'Nombre' },
    { clave: 'descripcion', etiqueta: 'Descripción' },
    { clave: 'precio', etiqueta: 'Precio' },
    { clave: 'stock', etiqueta: 'Stock' },
    { clave: 'proveedor.nombre', etiqueta: 'Proveedor' }
  ];

  restaurarProveedores() {
    this.nombre = '';

    this.productoService.listarProductosDesactivados().subscribe(
      (proveedores: any) => {
        this.productos = proveedores;
      },
    );
  }

  obtenerProducto() {
    this.productoService.listarProductosDesactivados().subscribe(
      (productos: any) => {
        this.productos = productos;
      },
    );
  }




  pageSize = 3;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  activarProducto(productoId: any): void {
    this.productoService.activarProducto(productoId).subscribe(
      (respuesta: any) => {
        this.alertService.aceptacion(TITULO_MESAJES.ACTIVADO, MENSAJES.ACTIVADO);

        this.obtenerProducto();
      },

    );
  }
}
