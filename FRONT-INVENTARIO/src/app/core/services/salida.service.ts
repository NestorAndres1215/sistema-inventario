import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from 'src/app/core/models/helper';


@Injectable({
  providedIn: 'root'
})
export class SalidaService {
  constructor(private http: HttpClient) {}

  listarSalidas(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/salidas`);
  }

  crearSalidaConDetalles(listaDetalleSalida: any[]): Observable<any> {
    return this.http.post(`${baserUrl}/salidas`, listaDetalleSalida);
  }

  actualizarDetalleSalida(detalleSalidaId: number, detalleSalida: any): Observable<any> {
  
    const url = `${baserUrl}/salidas/${detalleSalidaId}`;
    return this.http.put(url, detalleSalida);
  }

  obtenerSalidaPorId(detalleSalidaId: number): Observable<any> {
    return this.http.get(`${baserUrl}/salidas/${detalleSalidaId}`);
  }
}
