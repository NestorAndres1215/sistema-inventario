import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportesService } from 'src/app/core/services/reportes.service';
import { SalidaService } from 'src/app/core/services/salida.service';

@Component({
  selector: 'app-listar-salida-usuario',
  templateUrl: './listar-salida-usuario.component.html',
  styleUrls: ['./listar-salida-usuario.component.css']
})
export class ListarSalidaUsuarioComponent implements OnInit {

  detalleSalida: any[] = [];
 verDetalle(item: any): void {
  this.router.navigate(['/user-dashboard/salidas/detalle', item.detalleSalidaId]);
}
 botonesConfig = {
  ver: true
};
  constructor(private router: Router,
    private salidaService: SalidaService,
    private reporteSalida:ReportesService
  ) { }
  ngOnInit(): void {
    this.obtenerSalida();
 
  }
obtenerSalida(): void {
  console.log("Llegó obtenerSalida()");

  this.salidaService.listarSalidas().subscribe({
    next: (salidas: any) => {
      this.detalleSalida = salidas;
    },
    error: (error: any) => {
      console.error("Error al obtener las salidas:", error);
    },

  });
}
columnas = [
  { clave: 'detalleSalidaId', etiqueta: 'Código' },
  { clave: 'producto.nombre', etiqueta: 'Producto' },
  { clave: 'descripcion', etiqueta: 'Descripción' },
  { clave: 'cantidad', etiqueta: 'Cantidad' },
  { clave: 'salida.fechaSalida', etiqueta: 'Fecha de Salida' },
  { clave: 'usuario.nombre', etiqueta: 'Responsable' }
];

  descargarPDF() {
    this.reporteSalida.descargarSalida().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'informe_detalle_salidas_productos.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(urlBlob);
      document.body.removeChild(a);
    });
  }


}
