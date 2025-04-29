import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private readonly notificationService: NotificationService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { username, email, password } = this.registerForm.value;

    this.loaderService.showLoader();
    this.authService.register(username, email, password).subscribe({
      next: (success) => {
        this.loaderService.hideLoader();
        if (success) {
          console.log('Registro exitoso');
          this.router.navigate(['/login']);
          this.notificationService.showNotification({
            title: 'Registro exitoso',
            type: 'completed',
          });
        }
      },
      error: (err) => {
        this.loaderService.hideLoader();
        console.error('Error en el registro:', err);
        this.notificationService.showNotification({
          title: 'Error al completar el registro',
          type: 'error',
        });
      },
    });
  }
}
