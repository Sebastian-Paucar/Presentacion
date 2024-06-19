import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { ApiService } from '../../../Services/api.service';
import { Categoria } from '../../../interfaces/Categoria.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NuevaCategoriaComponent } from './nueva-categoria/nueva-categoria.component';


@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [EditarCategoriaComponent,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, 
    MatIconModule,MatPaginatorModule,MatSelectModule,MatButtonModule,MatDividerModule
  ,MatDialogModule],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent implements OnInit {
  displayedColumns: string[] = ['Id','Nombre','Detalle','Acciones'];
  dataSource = new MatTableDataSource<Categoria>();

  constructor(public dialog: MatDialog, private _categoria:ApiService ) {}


  @ViewChild(MatPaginator)  paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }



  openEditUserModal(datoCategoria:Categoria): void {
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '600px',
      data:datoCategoria
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      this.mostrarCategorias();
      
    });
  }
  eliminar(datoCategoria:Categoria): void {
    this. _categoria.deleteCategoria(datoCategoria.CategoriaId).subscribe({
      next:(data)=>{
        console.log(data);
        this.mostrarCategorias();
      }
    })
  }

  public categoria: string[]=['Id','Nombre','Detalle', 'Acciones'];
  openCrear(): void {
    const dialogRef = this.dialog.open(NuevaCategoriaComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      this.mostrarCategorias();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
  ngOnInit(): void {
    this.mostrarCategorias();
  }





}