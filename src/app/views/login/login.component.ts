import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public errorLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private readonly notificationService: NotificationService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('authToken')){
      this.router.navigate(['/dashboard']);
    }
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loaderService.showLoader();
    this.authService.login(email, password).subscribe({
      next: (user) => {
        this.loaderService.hideLoader();
        console.log('Login exitoso:', user);
        this.router.navigate(['/dashboard']);
        this.notificationService.showNotification({
          title: 'Bienvenido de nuevo',
          type: 'completed',
        });
      },
      error: (err) => {
        this.loaderService.hideLoader();
        console.error('Error en el login:', err);
        this.errorLogin = true;
        this.notificationService.showNotification({
          title: 'Error al iniciar sesión',
          type: 'error',
        });
      },
    });
  }
}
