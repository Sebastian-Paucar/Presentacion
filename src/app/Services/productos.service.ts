import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { ProductoInterface } from '../interfaces/Producto.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private endpoint:string = environment.endpoint;
  private apiUrl:string = this.endpoint+"api/Service";
  constructor(private http:HttpClient){}
getListProducto():Observable<ProductoInterface[]>{
return this.http.get<ProductoInterface[]>(`${this.apiUrl}ObtenerProductos`);
}
getProducto(ProductoId:number):Observable<ProductoInterface>{
  return this.http.get<ProductoInterface>(`${this.apiUrl}ObtenerProducto/${ProductoId}`);
  }
addProducto(modelo:ProductoInterface):Observable<ProductoInterface>{
return this.http.post<ProductoInterface>(`${this.apiUrl}CrearProucto`,modelo);
}
updateProducto(ProductoId:number,modelo:ProductoInterface):Observable<ProductoInterface>{
  return this.http.patch<ProductoInterface>(`${this.apiUrl}ActualizarProducto/${ProductoId}`,modelo);
}
deleteProducto(ProductoId:number):Observable<void>{
  return this.http.delete<void>(`${this.apiUrl}EliminarProducto/${ProductoId}`);
}

}

