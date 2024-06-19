import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Producto } from '../../../../interfaces/Producto.interface';
import { ApiService } from '../../../../Services/api.service';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nuevo-producto.component.html',
  styleUrl: './nuevo-producto.component.css'
})
export class NuevoProductoComponent {
  tareasForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<NuevoProductoComponent>, private fb: FormBuilder,private _producto: ApiService) {
    this.tareasForm = this.fb.group({
      ProductoNombre: ['', [Validators.required, Validators.maxLength(100)]],
      PrecioUnitario: ['', [Validators.required, Validators.min(0)]],
      EnStock: ['', [Validators.required, Validators.min(0)]],
      CategoriaId: ['', Validators.required] 
    });

  }


  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const modelo:Producto={
      ProductoId:this.tareasForm.value.ProductoId,
      ProductoNombre:this.tareasForm.value.ProductoNombre,
      PrecioUnitario:this.tareasForm.value.PrecioUnitario,
      EnStock:this.tareasForm.value.EnStock,
      CategoriaId:this.tareasForm.value.CategoriaId,
    }
    if (this.tareasForm.valid) {
      console.log('Formulario de Tareas:', this.tareasForm.value);
      this. _producto.addProducto(modelo).subscribe({
        next:(data)=>{
          console.log(data);
          console.log("Creado");
        }
      })
      // Aquí iría la lógica para procesar los datos del formulario, como enviarlos a un backend.
    } else {
      console.log(this.tareasForm.value);
      console.log('Formulario no válido');
    }
  }
}
