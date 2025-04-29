import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProject } from '../../../../models/projects.interface';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  imports: [CommonModule],
})
export class ProjectCardComponent {
  @Input() project!: IProject

  constructor(
    private readonly projectService: ProjectService,
  ) {}

  getStatusClasses(): string {
    switch (this.project.status) {
      case 'Completado':
        return 'bg-green-100 text-green-800';
      case 'En progreso':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pendiente':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  setProjectInformation(): void {
    this.projectService.loadProjectCardInformation(this.project);
  }
}
