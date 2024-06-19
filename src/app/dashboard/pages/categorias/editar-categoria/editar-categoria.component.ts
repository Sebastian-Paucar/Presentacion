import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-categoria.component.html',

})
export class EditarCategoriaComponent {
  tareasForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<EditarCategoriaComponent>, private fb: FormBuilder) {
    this.tareasForm = this.fb.group({
      ProductoNombre: ['', [Validators.required, Validators.maxLength(100)]],
      PrecioUnitario: ['', Validators.required, Validators.min(0)],
      EnStock: ['', Validators.required, Validators.min(0)],
      CategoriaId: ['', Validators.required] 
    });

  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.tareasForm.valid) {
      console.log('Formulario de Tareas:', this.tareasForm.value);
      // Aquí iría la lógica para procesar los datos del formulario, como enviarlos a un backend.
    } else {
      console.log('Formulario no válido');
    }
  }
}
