import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../../../../interfaces/Categoria.interface';
import { ApiService } from '../../../../Services/api.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-categoria.component.html',

})
export class EditarCategoriaComponent {
  dataCategoria:Categoria=inject(MAT_DIALOG_DATA);
  dataSource = new MatTableDataSource<Categoria>();
  tareasForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<EditarCategoriaComponent>, private fb: FormBuilder,private _categoria: ApiService) {
    this.tareasForm = this.fb.group({
      CategoriaNombre: [this.dataCategoria.CategoriaNombre, [Validators.required, Validators.maxLength(100)]],
      Detalle: [this.dataCategoria.Detalle , [Validators.required, Validators.maxLength(100)]],
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
      console.log('Formulario de Tareas:',this.tareasForm.value);
      this. _categoria.updateCategoria(this.dataCategoria.CategoriaId,modelo).subscribe({
        next:(data)=>{
          console.log(data);
          console.log("Cambiado");
        }
      })
      this.mostrarCategorias();
      // Aquí iría la lógica para procesar los datos del formulario, como enviarlos a un backend.
    } else {
      console.log(this.tareasForm.value);
      console.log('Formulario no válido');
    }
  }
    mostrarCategorias(){
    this. _categoria.getListCategoria().subscribe({
      next:(data)=>{
        console.log(data);
        this.dataSource.data=data;
      }
    })
  }
}
