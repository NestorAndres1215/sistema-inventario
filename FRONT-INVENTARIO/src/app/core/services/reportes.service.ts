import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from 'src/app/core/models/helper';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  descargarSalida(): Observable<Blob> {
    return this.descargarReporte('/pdf/generar-salidas');
  }

  descargarEntrada(): Observable<Blob> {
    return this.descargarReporte('/pdf/generar-entradas');
  }

  descargarProveedor(): Observable<Blob> {
    return this.descargarReporte('/pdf/generar-proveedor');
  }

  descargarProducto(): Observable<Blob> {
    return this.descargarReporte('/pdf/generar-productos');
  }

  descargarUsuarioAdmin(): Observable<Blob> {
    return this.descargarReporte('/pdf/generar-administrador');
  }

  descargarUsuarioOperador(): Observable<Blob> {
    return this.descargarReporte('/pdf/generar-operador');
  }

  private descargarReporte(endpoint: string): Observable<Blob> {
    const url = `${baserUrl}${endpoint}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
