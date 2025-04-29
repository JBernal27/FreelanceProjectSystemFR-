import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { NotificationService } from '../../services/notification.service';
import { IProject } from '../../models/projects.interface';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public projects: IProject[] = [];
  public isModalCreateOpen: boolean = false;
  public isModalOpen: boolean = false;
  public projectInformation: IProject | null = null;

  constructor(
    private readonly projectService: ProjectService,
    private readonly notificationService: NotificationService,
    private readonly loaderService: LoaderService,
    private readonly authService: AuthService,    
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loaderService.showLoader();
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.loaderService.hideLoader();
        this.projects = projects;
      },
      error: () => {
        this.loaderService.hideLoader();
        this.notificationService.showNotification({
          title: 'Error al cargar los proyectos',
          type: 'error',
        });
      },
    });
  }

  openModal(): void {
    this.isModalCreateOpen = true;
  }

  openProjectModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalCreateOpen = false;
  }

  onupdateProjects(): void {
    this.loadProjects();
  }

  logout(): void {
    this.authService.logout();
    this.notificationService.showNotification({
      title: 'Sesión cerrada correctamente',
      type: 'completed',
    });
    this.router.navigate(['/login']);
  }
}
