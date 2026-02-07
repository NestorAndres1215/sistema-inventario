import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../core/services/login.service';
import { ROLES } from 'src/app/core/constants/rol';


// Constantes
const SNACK_DURATION = 3000;
const MESSAGES = {
  requiredUsername: 'El nombre de usuario es requerido.',
  requiredPassword: 'La contraseña es requerida.',
  invalidCredentials: 'Detalles inválidos. Vuelva a intentar.',
};
const ROUTES = {
  admin: 'admin',
  user: 'user-dashboard',
};

interface LoginData {
  login: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: LoginData = { login: '', password: '' };
  hidePassword = true;

  constructor(
    private readonly snack: MatSnackBar,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) { }

  ngOnInit(): void { }

  formSubmit(): void {
    const { login, password } = this.loginData;

    console.log(this.loginData)
    if (!login.trim()) {
      this.showSnack(MESSAGES.requiredUsername);
      return;
    }

    if (!password.trim()) {
      this.showSnack(MESSAGES.requiredPassword);
      return;
    }
    this.loginService.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe({
          next: (user: any) => {
            this.loginService.setUser(user);
            const rol = user.authorities[0].authority
            this.navigateByRole(rol);
          },
          error: () => this.loginService.logout(),
        });
      },
      error: (error) => {
        console.log(error)
      },
    });
  }



  private navigateByRole(role: string): void {
    switch (role) {
      case ROLES.ADMIN:
        this.router.navigate([ROUTES.admin]);
        break;
      case ROLES.NORMAL:
        this.router.navigate([ROUTES.user]);
        break;
      default:
        this.loginService.logout();
        return;
    }

    this.loginService.loginStatusSubjec.next(true);
  }

  private showSnack(message: string): void {
    this.snack.open(message, 'Aceptar', { duration: SNACK_DURATION });
  }
}
