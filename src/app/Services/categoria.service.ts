import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { CategoriaInterface } from '../interfaces/Categoria.interface';
@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
private endpoint:string = environment.endpoint;
private apiUrl:string = this.endpoint+"api/Service";

constructor(private http:HttpClient){}
getListCategoria():Observable<CategoriaInterface[]>{
return this.http.get<CategoriaInterface[]>(`${this.apiUrl}ObtenerCategorias`);

}


}
