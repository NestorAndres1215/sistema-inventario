import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baserUrl from 'src/app/core/models/helper';


@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  constructor(private http: HttpClient) {}

  listarEntradas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/entradas`);
  }

  crearEntradaConDetalles(listaDetalleEntrada: any[]): Observable<any> {
    return this.http.post(`${baserUrl}/entradas`, listaDetalleEntrada);
  }

  actualizarDetalleEntrada(detalleEntradaId: number, detalleEntrada: any): Observable<any> {
    const url = `${baserUrl}/entradas/${detalleEntradaId}`;
    return this.http
      .put(url, detalleEntrada);
  }

  obtenerEntradaPorId(detalleEntradaId: number): Observable<any> {
    return this.http.get(`${baserUrl}/entradas/${detalleEntradaId}`);
  }

}
