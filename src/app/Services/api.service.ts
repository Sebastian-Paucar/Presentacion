import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable, delay } from 'rxjs';
import { Producto } from '../interfaces/Producto.interface';
import { Categoria } from '../interfaces/Categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private endpoint: string = environment.endpoint;
  private apiUrl: string = this.endpoint + 'Service/';

  constructor(private http: HttpClient) { }

  getListProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}ObtenerProductos`);
  }

  getProducto(ProductoId: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}ObtenerProducto/${ProductoId}`);
  }

  addProducto(modelo: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}CrearProucto`, modelo);
  }

  updateProducto(ProductoId: number, modelo: Producto): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}ActualizarProducto/${ProductoId}`, modelo);
  }

  deleteProducto(ProductoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}EliminarProducto/${ProductoId}`).pipe(delay(1500));
  }

  getListCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}ObtenerCategorias`);
  }
  updateCategoria(CategoriaId: number, modelo: Categoria): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.apiUrl}ActualizarCategoria/${CategoriaId}`, modelo);
  }
  addCategoria(modelo: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}CrearCategoria`, modelo);
  }
  deleteCategoria(CategoriaId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}EliminarCategoria/${CategoriaId}`).pipe(delay(1500));
  }
}
