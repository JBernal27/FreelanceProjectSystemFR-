import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { INotification } from '../../../interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public notification: INotification | null = null;

  constructor(private readonly notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe((notification) => {
      this.notification = notification;
    });
  }
}
