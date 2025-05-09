import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';
import { NotificationService } from '../../../../services/notification.service';
import { LoaderService } from '../../../../services/loader.service';

@Component({
  selector: 'app-modal-create',
  standalone: false,
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css'],
})
export class ModalCreateComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() updateProjects = new EventEmitter<void>();
  public projectForm!: FormGroup;
  public states: string[] = ['Completado', 'En progreso', 'Pendiente'];

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
      .createProject({
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
            title: 'Proyecto creado exitosamente',
            type: 'completed',
          });
        },
        error: (err) => {
          this.loaderService.hideLoader();
          console.error('Error al crear el proyecto:', err);
          this.notificationService.showNotification({
            title: 'Hubo un error al crear el proyecto',
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
