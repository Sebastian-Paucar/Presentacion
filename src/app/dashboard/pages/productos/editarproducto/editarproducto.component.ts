import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../../../interfaces/Producto.interface';
import { ApiService } from '../../../../Services/api.service';

@Component({
  selector: 'app-editarproducto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editarproducto.component.html',
  styleUrl: './editarproducto.component.css'
})
export class EditarproductoComponent {
  dataProducto:Producto=inject(MAT_DIALOG_DATA);
  tareasForm: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<EditarproductoComponent>, private fb: FormBuilder,private _producto: ApiService) {
    this.tareasForm = this.fb.group({
      ProductoNombre: [this.dataProducto.ProductoNombre, [Validators.required, Validators.maxLength(100)]],
      PrecioUnitario: [this.dataProducto.PrecioUnitario, [Validators.required, Validators.min(0)]],
      EnStock: [this.dataProducto.EnStock, [Validators.required, Validators.min(0)]],
      CategoriaId: [this.dataProducto.CategoriaId, Validators.required] 
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
      console.log('Formulario de Tareas:',this.tareasForm.value);
      this. _producto.updateProducto(this.dataProducto.ProductoId,modelo).subscribe({
        next:(data)=>{
          console.log(data);
          console.log("Cambiado");
        }
      })
      // Aquí iría la lógica para procesar los datos del formulario, como enviarlos a un backend.
    } else {
      console.log(this.tareasForm.value);
      console.log('Formulario no válido');
    }
  }
}
