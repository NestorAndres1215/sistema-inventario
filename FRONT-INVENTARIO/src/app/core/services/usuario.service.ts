import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from 'src/app/core/models/helper';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { UsuarioValidator } from '../validator/usuario.validator';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  obtenerAdminUsuariosActivos(): Observable<any> {
    return this.http.get(`${baserUrl}/usuarios/admin/activadas`);
  }

  obtenerUsuariosNormalesActivos(): Observable<any> {
    return this.http.get(`${baserUrl}/usuarios/normal/activadas`);
  }


  obtenerAdminUsuariosDesactivados(): Observable<any> {
    return this.http.get(`${baserUrl}/usuarios/admin/desactivadas`);
  }

  obtenerUsuariosNormalesDesactivados(): Observable<any> {
    return this.http.get(`${baserUrl}/usuarios/normal/desactivadas`);
  }


  registrarAdmin(user: any): Observable<any> {
    return this.http.post(`${baserUrl}/usuarios/guardar-admin`, user);
  }

  registrarNormal(user: any): Observable<any> {

    return this.http.post(`${baserUrl}/usuarios/guardar-normal`, user);
  }

  desactivarUsuario(id: number): Observable<any> {
    return this.http.put(`${baserUrl}/desactivar/${id}`, {});
  }

  activarUsuario(id: number): Observable<any> {
    return this.http.put(`${baserUrl}/activar/${id}`, {});
  }

  obtenerUsuarioPorId(usuarioRolId: number): Observable<any> {
    return this.http.get(`${baserUrl}/usuarios/listarId/${usuarioRolId}`);
  }

  actualizarUsuario(id: number, usuarioActualizado: any): Observable<any> {

    return this.http.put(`${baserUrl}/usuarios/${id}`, usuarioActualizado);
  }
}
