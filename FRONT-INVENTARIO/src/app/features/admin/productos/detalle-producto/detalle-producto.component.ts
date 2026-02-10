import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';

interface Producto {
  productoId: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  ubicacion: string;
  proveedor?: { proveedorId: number; nombre?: string };
  // Agrega aquí otros campos que tenga tu producto
}

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: any | null = null;
  productoId: number = 0;

  constructor(
    private readonly productoService: ProductoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('productoId'));
    this.cargarProducto();
  }

  private cargarProducto(): void {
    this.productoService.obtenerProductoPorId(this.productoId)
      .subscribe({
        next: (data: Producto) => this.producto = data,
        error: (err) => console.error('Error al obtener producto:', err)
      });
  }

}
