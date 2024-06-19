import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [EditarCategoriaComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  constructor(public dialog: MatDialog) {}
  public categoria: string[]=['Id','Nombre','Detalle', 'Acion'];

  openEditUserModal(): void {
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
    });
  }
}