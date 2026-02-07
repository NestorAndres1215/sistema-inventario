import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../core/services/login.service';
import { ROLES } from 'src/app/core/constants/rol';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { MENSAJES, TITULO_MESAJES } from 'src/app/core/constants/messages';
import { LoginData } from 'src/app/core/constants/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  hidePassword = true;
  formulario!: FormGroup;

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.initForm()
  }

  verContraActual = false;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  initForm() {
    this.formulario = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  operar(): void {

    if (this.formulario.invalid) {
      this.alertService.advertencia(TITULO_MESAJES.CAMPOS_INCOMPLETOS_TITULO, MENSAJES.CAMPOS_INCOMPLETOS_MENSAJE);
      this.formulario.markAllAsTouched();
      return;
    }
    const login: LoginData = {
      login: this.formulario.get('login')?.value,
      password: this.formulario.get('password')?.value,
    };
    this.loginService.generateToken(login).subscribe({
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
        this.router.navigate(['admin']);
        break;
      case ROLES.NORMAL:
        this.router.navigate(['user-dashboard']);
        break;
      default:
        this.loginService.logout();
        return;
    }

    this.loginService.loginStatusSubjec.next(true);
  }


}
