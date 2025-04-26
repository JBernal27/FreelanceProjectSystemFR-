import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-create',
  standalone: false,
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css']
})
export class ModalCreateComponent implements OnInit {
  public projectForm!: FormGroup;
  public states: string[] = ["Completado", "En progreso", "Pendiente"];

  constructor(private fb: FormBuilder) {}

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
    console.log('Proyecto creado:', { name, description, state, startDate, endDate });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.projectForm.get(field);
    return control?.invalid && control?.touched ? true : false;
  }
}
