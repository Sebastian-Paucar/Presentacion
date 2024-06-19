import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../Services/api.service';
import { Categoria } from '../../../../interfaces/Categoria.interface';

@Component({
  selector: 'app-nueva-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-categoria.component.html',
  styleUrl: './nueva-categoria.component.css'
})
export class NuevaCategoriaComponent {
  tareasForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<NuevaCategoriaComponent>, private fb: FormBuilder,private _categoria: ApiService) {
    this.tareasForm = this.fb.group({
      CategoriaId: ['', [Validators.required, Validators.maxLength(100)]],
      CategoriaNombre: ['', [Validators.required, Validators.min(0)]],
      Detalle: ['', [Validators.required, Validators.min(0)]],
    });

  }
  onClose(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    const modelo:Categoria={
      CategoriaId:this.tareasForm.value.CategoriaId,
      CategoriaNombre:this.tareasForm.value.CategoriaNombre,
      Detalle:this.tareasForm.value.Detalle,
    }
    if (this.tareasForm.valid) {
      console.log('Formulario de Tareas:', this.tareasForm.value);
      this. _categoria.addCategoria(modelo).subscribe({
        next:(data)=>{
          console.log(data);
          console.log("Creado");
          
        }
      })
      // Aquí iría la lógica para procesar los datos del formulario, como enviarlos a un backend.
      this.dialogRef.close();
    } else {
      console.log(this.tareasForm.value);
      console.log('Formulario no válido');
    }
  }


}
