import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../../services/project.service';

@Component({
  selector: 'app-modal-create',
  standalone: false,
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent implements OnInit {
  public projectForm!: FormGroup;
  public states: string[] = ["Completado", "En progreso", "Pendiente"];

  constructor(private readonly fb: FormBuilder, private readonly projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      state: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const { name, description, state, startDate, endDate } = this.projectForm.value;

    this.projectService.createProject({
      title: name,
      description,
      start_date: startDate,
      delivery_date: endDate,
      status: state
    }).subscribe({});
    // console.log('Proyecto creado:', { name, description, state, startDate, endDate });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.projectForm.get(field);
    return control?.invalid && control?.touched ? true : false;
  }
}
