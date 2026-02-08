import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.css']
})
export class TablaDatosComponent  {

  constructor() { }
  @Input() datos: { clave: string; valor: string }[] = [];
  @Input() titulo: string = 'Tabla de Información';
}
