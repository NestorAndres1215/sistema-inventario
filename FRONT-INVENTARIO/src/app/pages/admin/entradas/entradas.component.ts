import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntradaService } from 'src/app/core/services/entrada.service';
import { ReportesService } from 'src/app/core/services/reportes.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent implements OnInit {

 detalleEntrada: any[] = [];
columnas = [
  { clave: 'detalleEntradaId', etiqueta: 'Código' },
  { clave: 'producto.nombre', etiqueta: 'Producto' },
  { clave: 'descripcion', etiqueta: 'Descripción' },
  { clave: 'cantidad', etiqueta: 'Cantidad' },
  { clave: 'entrada.fechaEntrada', etiqueta: 'Fecha de Salida' },
  { clave: 'usuario.nombre', etiqueta: 'Responsable' }
];
botonesConfig = {
  ver: true
};
verDetalle(item: any): void {
  this.router.navigate(['/admin/entradas/detalle', item.detalleSalidaId]);
}
  constructor(

    private readonly entradaService: EntradaService,
    private readonly router: Router,
    private readonly reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    this.obtenerEntradas();
  }

  private obtenerEntradas(): void {
    this.entradaService.listarEntradas().subscribe({
      next: (data: any[]) => {
        this.detalleEntrada = data;
      },

    });
  }

  descargarPDF(): void {
    this.reportesService.descargarEntrada().subscribe({
      next: (data: Blob) => this.generarPDF(data),
    });
  }

  private generarPDF(data: Blob): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'informe_detalle_entradas_productos.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
