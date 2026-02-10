import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import baserUrl from '../models/helper';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new Subject<boolean>();
  loginStatusSubjec: any;

  constructor(private http: HttpClient) { }


  generateToken(loginData: any): Observable<any> {
    return this.http.post(`${baserUrl}/auth/generate-token`, loginData);
  }


  getCurrentUser() {
    return this.http.get(`${baserUrl}/auth/actual-usuario`);
  }

  loginUser(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token && token.trim() !== '';
  }

  logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user?.authorities?.[0]?.authority || null;
  }

}
