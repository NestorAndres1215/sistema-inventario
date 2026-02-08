import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { SalidaService } from 'src/app/core/services/salida.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent implements OnInit {
 salidas: any[] = [];
detalleSalida: any;
columnas = [
  { clave: 'detalleSalidaId', etiqueta: 'Código' },
  { clave: 'producto.nombre', etiqueta: 'Producto' },
  { clave: 'descripcion', etiqueta: 'Descripción' },
  { clave: 'cantidad', etiqueta: 'Cantidad' },
  { clave: 'salida.fechaSalida', etiqueta: 'Fecha de Salida' },
  { clave: 'usuario.nombre', etiqueta: 'Responsable' }
];
botonesConfig = {
  ver: true
};
verDetalle(item: any): void {
  this.router.navigate(['/admin/salidas/detalle', item.detalleSalidaId]);
}
  constructor(
    private salidaService: SalidaService,private router:Router,
    private reporteSalida: ReportesService
  ) { }

  ngOnInit(): void {
    this.listarSalidas();
  }

  listarSalidas() {
    this.salidaService.listarSalidas().subscribe({
      next: (data: any[]) => {
        this.salidas = data;
      },
    });
  }

  descargarPDF() {
    this.reporteSalida.descargarSalida().subscribe({
      next: (data: Blob) => {
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'informe_detalle_salidas_productos.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
      },
    });
  }
}
