import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {FuncionalidadDTO} from '../modelo/funcionalidad-dto';
import {Proyecto} from '../modelo/Proyecto';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http:HttpClient) { }


  url='https://app-back-urrea.herokuapp.com/api';

  getProyectos(){
    return this.http.get<Proyecto[]>(this.url+'/proyecto/list')
    .pipe(
      map( (resp:Proyecto[])  =>
        resp.map( proyectox=> ({idProyecto: proyectox.idProyecto, nombreProyecto:proyectox.nombreProyecto})
        )
      )
    );
  }

  postData(data: FuncionalidadDTO[]): Observable<FuncionalidadDTO>{
      return this.http.post<FuncionalidadDTO>(this.url+'/funcionalidad/crear', data);
  }
}
