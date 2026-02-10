import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/core/services/login.service';
import { ROLES } from '../constants/rol';



@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLogged = this.loginService.isLoggedIn();
    const userRole = this.loginService.getUserRole();

    if (isLogged && userRole === 'user-dashboard') {
      return true;
    }

    this.router.navigate(['/admin']);
    return false;
  }

}
