import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { EditarproductoComponent } from './editarproducto/editarproducto.component';
import { Producto } from '../../../interfaces/Producto.interface';
import { ApiService } from '../../../Services/api.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule,
    MatIconModule,MatPaginatorModule,MatSelectModule,MatButtonModule,MatDividerModule
  ,MatDialogModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements AfterViewInit {

  displayedColumns: string[] = ['Id','Nombre','Precio', 'EnStock', 'Categoria','Acciones'];
  dataSource = new MatTableDataSource<Producto>();
  constructor(public dialog: MatDialog,private _producto: ApiService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openEditUserModal(datoProducto: Producto): void {
    const dialogRef = this.dialog.open(EditarproductoComponent, {
      width: '600px',
      data: datoProducto
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      this.mostrarProductos(); // Recargar la tabla después de cerrar el modal
    });
  }

  eliminar(datoProducto: Producto): void {
    this._producto.deleteProducto(datoProducto.ProductoId).subscribe({
      next: (data) => {
        console.log(data);
        this.mostrarProductos();
      }
    })
  }

  openCrear(): void {
    const dialogRef = this.dialog.open(NuevoProductoComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');
      this.mostrarProductos(); // Recargar la tabla después de cerrar el modal
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  mostrarProductos() {
    this._producto.getListProducto().subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data;
      }
    })
  }

  ngOnInit(): void {
    this.mostrarProductos();
  }
}
