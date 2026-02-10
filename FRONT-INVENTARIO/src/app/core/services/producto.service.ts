import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baserUrl from 'src/app/core/models/helper';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  listarProductosActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/producto/activadas`);
  }

  listarProductosDesactivados(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/producto/desactivadas`);
  }

  obtenerProductoPorId(productoId: number): Observable<any> {
    return this.http.get(`${baserUrl}/producto/${productoId}`);
  }

  agregarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${baserUrl}/producto/`, producto)
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${baserUrl}/producto/actualizar/`, producto)
  }

  desactivarProducto(productoId: number): Observable<any> {
    return this.http.post(`${baserUrl}/producto/desactivar/${productoId}`, {});
  }

  activarProducto(productoId: number): Observable<any> {
    return this.http.post(`${baserUrl}/producto/activar/${productoId}`, {});
  }

}