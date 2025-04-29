import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { INotification } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<INotification | null>(null);

  getNotification(): Observable<INotification | null> {
    return this.notificationSubject.asObservable();
  }

  showNotification(notification: INotification): void {
    this.notificationSubject.next(notification);
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }
}