import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/core/services/producto.service';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  producto: any | null = null;
  productoId: number = 0;
  datosProducto: { clave: string; valor: any }[] = [];

  constructor(
    private readonly productoService: ProductoService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('productoId'));
    this.cargarProducto();
  }

  private cargarProducto(): void {
    this.productoService.obtenerProductoPorId(this.productoId)
      .subscribe({
        next: (data: any) => {
          this.producto = data;

          // 👇 armamos los datos para app-tabla-datos
          this.datosProducto = [
            { clave: 'Código', valor: data.productoId },
            { clave: 'Nombre', valor: data.nombre },
            { clave: 'Descripción', valor: data.descripcion },
            { clave: 'Precio', valor: `S/. ${data.precio}` },
            { clave: 'Stock', valor: data.stock },
            { clave: 'Proveedor', valor: data.proveedor?.nombre },
            { clave: 'Estado', valor: data.estado ? 'Activo' : 'Desactivado' }
          ];
        },
        error: (err) => console.error('Error al obtener producto:', err)
      });
  }
}
