import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from 'src/app/core/models/helper';


@Injectable({
  providedIn: 'root'
})
export class ReclamoService {
  constructor(private http: HttpClient) {}

  listarReclamosActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/reclamo/activadas`);
  }


  listarReclamosDesactivados(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/reclamo/desactivadas`);
  }

  agregarReclamo(reclamo: any): Observable<any> {

    return this.http.post(`${baserUrl}/reclamo`, reclamo);
  }

  obtenerReclamoPorId(reclamoId: number): Observable<any> {
    return this.http.get(`${baserUrl}/reclamo/${reclamoId}`);
  }

  enviarDisculpas(reclamoId: number, mensaje: string): Observable<string> {
    return this.http.post<string>(`${baserUrl}/reclamo/${reclamoId}`, mensaje);
  }
}
