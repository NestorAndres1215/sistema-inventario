import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalidaService } from 'src/app/core/services/salida.service';

@Component({
  selector: 'app-detalle-salidas',
  templateUrl: './detalle-salidas.component.html',
  styleUrls: ['./detalle-salidas.component.css']
})
export class DetalleSalidasComponent implements OnInit {

  detalleSalida: any;
  detalleSalidaId: any = 0;

  constructor(
    private salidaService: SalidaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.detalleSalidaId = this.route.snapshot.params['detalleSalidaId'];
    console.log("llego id" + this.detalleSalidaId);
    console.log(this.route.snapshot.params);
    this.obtenerSalidaId(this.detalleSalidaId)


  }

  datosUsuario: { clave: string; valor: any }[] = [];

  obtenerSalidaId(detalleSalidaId: number): void {
    this.salidaService.obtenerSalidaPorId(detalleSalidaId).subscribe({
      next: (data: any) => {
        this.detalleSalida = data;

        this.datosUsuario = [
          { clave: 'Código', valor: data.detalleSalidaId },
          { clave: 'Producto', valor: data.producto?.nombre },
          { clave: 'Descripción', valor: data.descripcion },
          { clave: 'Cantidad', valor: data.cantidad },
          { clave: 'Stock', valor: data.producto?.stock },
          { clave: 'Fecha de salida', valor: data.salida?.fechaSalida },
          { clave: 'Usuario', valor: data.usuario?.username },
          { clave: 'Nombre', valor: `${data.usuario?.nombre} ${data.usuario?.apellido}` }
        ];
      },

    });
  }

}
