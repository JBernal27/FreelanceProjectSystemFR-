import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private readonly notificationService: NotificationService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.notificationService.showNotification({
        title: 'Debes iniciar sesión para acceder a esta página',
        type: 'error'
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}
