import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { NotificationService } from '../../../../services/notification.service';
import { LoaderService } from '../../../../services/loader.service';
import { IProject } from '../../../../models/projects.interface';

@Component({
  selector: 'app-project-modal',
  standalone: false,
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
})
export class ProjectModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() updateProjects = new EventEmitter<void>();
  public project: IProject | null = null;
  public projectForm!: FormGroup;
  public states: string[] = ['Completado', 'En progreso', 'Pendiente'];
  public isEditing: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly projectService: ProjectService,
    private readonly notificationService: NotificationService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      state: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.projectService.getProjectCardInformation().subscribe((project) => {
      if (project) {
        this.project = project;
      }

      if (project) {
        this.projectForm.patchValue({
          name: project.title || '',
          description: project.description || '',
          state: project.status || '',
          startDate: project.start_date || '',
          endDate: project.delivery_date || '',
        });
      }
    });
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  onDelete(): void {
    if (confirm('¿Está seguro de que desea eliminar el proyecto?')) {
      this.loaderService.showLoader();
      this.projectService.deleteProject(this.project?.id || 0).subscribe({
        next: () => {
          this.loaderService.hideLoader();
          this.updateProjects.emit();
          this.close.emit();
          this.notificationService.showNotification({
            title: 'Proyecto eliminado exitosamente',
            type: 'completed',
          });
        },
        error: (err) => {
          this.loaderService.hideLoader();
          console.error('Error al emilimar el proyecto:', err);
          this.notificationService.showNotification({
            title: 'Hubo un error al eliminar el proyecto',
            type: 'error',
          });
        },
      });
    } else{
      this.notificationService.showNotification({
        title: 'El proyecto no fue eliminado',
        type: 'info',
      });
      this.close.emit();
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const { name, description, state, startDate, endDate } =
      this.projectForm.value;

    this.loaderService.showLoader();
    this.projectService
      .updateProject({
        id: this.project?.id || 0,
        title: name,
        description,
        start_date: startDate,
        delivery_date: endDate,
        status: state,
      })
      .subscribe({
        next: () => {
          this.loaderService.hideLoader();
          this.updateProjects.emit();
          this.close.emit();
          this.notificationService.showNotification({
            title: 'Proyecto editado exitosamente',
            type: 'completed',
          });
        },
        error: (err) => {
          this.loaderService.hideLoader();
          console.error('Error al eliminar el proyecto:', err);
          this.notificationService.showNotification({
            title: 'Hubo un error al editar el proyecto',
            type: 'error',
          });
        },
      });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.projectForm.get(field);
    return control?.invalid && control?.touched ? true : false;
  }

  onClose(): void {
    this.close.emit();
  }
}
