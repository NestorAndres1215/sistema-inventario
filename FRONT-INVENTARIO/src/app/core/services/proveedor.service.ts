import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from 'src/app/core/models/helper';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  constructor(private http: HttpClient) { }


  listarProveedoresActivos(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/proveedor/activadas`);
  }

  listarProveedoresDesactivados(): Observable<any[]> {
    return this.http.get<any[]>(`${baserUrl}/proveedor/desactivadas`);
  }


  agregarProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(`${baserUrl}/proveedor/`, proveedor);
  }

  actualizarProveedor(proveedorId: number, proveedor: any): Observable<any> {
    return this.http.put(`${baserUrl}/proveedor/${proveedorId}`, proveedor, {  });
  }


  obtenerProveedorPorId(proveedorId: number): Observable<any> {
    return this.http.get(`${baserUrl}/proveedor/${proveedorId}`);
  }

  desactivarProveedor(proveedorId: number): Observable<any> {
    return this.http.post(`${baserUrl}/proveedor/desactivar/${proveedorId}`, {});
  }

  activarProveedor(proveedorId: number): Observable<any> {
    return this.http.post(`${baserUrl}/proveedor/activar/${proveedorId}`, {});
  }


}
