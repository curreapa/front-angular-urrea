import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Proyecto } from '../modelo/Proyecto';
import { Funcionalidad } from '../modelo/Funcionalidad';
import { Modulo } from '../modelo/Modulo';
import { FormularioService } from '../services/formulario.service';
import { Descripcion } from '../modelo/Descripcion';
import { FuncionalidadDTO } from '../modelo/funcionalidad-dto';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  //VARIABLE PARA CONECTAR FORMULARIO HTML CON FORMULARIO.COMPONENET.TS
  forma: FormGroup;
  
  //VARIABLE PARA ALMACENAR DATOS OBTENIDOS EN FORMULARIO.SERVICE
  proyectos:Proyecto[];
  

  //VARIABLES PARA SECCION MODULO
  modulos: Array<Modulo>=[];
  modulo:Modulo;

  //VARIABLE PARA DESCRICPCION
  descripciones: Array<Descripcion>=[];
  descripcion: Descripcion;

  //VARIABLE PARA FUNCIONALIDAD
  funcionalidades: Array<Funcionalidad>=[];
  funcionalidad:Funcionalidad;
  

  //VARIABLE PARA PROYECTOS
  proyectosSeleccionados: Array<Proyecto>=[];
  pro: Proyecto;

  //DTO PARA ENVIAR A SERVICE
  funcionalidadDTO: FuncionalidadDTO;
  funcionalidadesDTO: Array<FuncionalidadDTO>=[];

  constructor(private formService:FormularioService, private fb:FormBuilder) {

    this.crearFormulario();
   }

 

  ngOnInit(): void {

    this.formService.getProyectos().subscribe(
      Proyecto=>{
          
          this.proyectos = Proyecto;
          this.proyectos.unshift(
            {
              idProyecto: null,
              nombreProyecto: "Seleccione Proyectos"
            }
          )
      }
    );
  }

  crearFormulario(){
    this.forma = this.fb.group({
      key: [''],
      nombreCorto: [''],
      short: [''],
      modulo:[''],
      descripcion: [''],
      archivo:[''],
      componente: [''],
      funcionalidad:['']
    })
  }
  guardar(){
    console.log(this.forma.value);
  }
 
  //SECCION MODULO 
  agregarModulo(){
   this.modulo = {
     idModulo :null,
     nombreModulo : this.forma.value.modulo
   }
   this.modulos.push(this.modulo); 
  }
  
  eliminarModulo(indexModulo){
    this.modulos.splice(indexModulo,1)
  }

  //SECCION DESCRIPCION
  agregarDescripcion(){
    this.descripcion = {
      idDescripcion :null,
      descripcion : this.forma.value.descripcion,
      archivo: this.forma.value.archivo,
      elemento: this.forma.value.componente
    }
    this.descripciones.push(this.descripcion); 
   }
   
   eliminarDescripcion(indexDescripcion){
     this.descripciones.splice(indexDescripcion,1)
   }
   //SECCION FUNCIONALIDAD 
 agregarFuncionalidad(){
    this.funcionalidad = {
      idFuncionalidad :null,
      nombreFuncionalidad : this.forma.value.funcionalidad
    }
    this.funcionalidades.push(this.funcionalidad); 
   }
   
   eliminarFuncionalidad(indexFuncionalidad){
     this.funcionalidades.splice(indexFuncionalidad,1)
   }

   //SECCION PROYECTOS

   
   onChange(event){
      let value = event.target.value;
      let proj = this.proyectos.find(element => element.nombreProyecto == value)
      this.pro = {
        idProyecto: proj.idProyecto,
        nombreProyecto: value
      }
      this.proyectosSeleccionados.push(this.pro); 
   }
   eliminarProyecto(index){
     console.log(index)
     this.proyectosSeleccionados.splice(index, 1)
   }
   generarDTO(){
     this.agregarFuncionalidad();
     this.funcionalidadDTO = {
      funcionalidad: this.funcionalidad,
      privilegio: {
        idPrivilegio: null,
        clavePrivilegio: this.forma.value.key,
        nombreCorto: this.forma.value.nombreCorto,
        shortPrivilegio: this.forma.value.short
      },
      modulos: this.modulos,
      proyectos: this.proyectosSeleccionados,
      descripcion: this.descripciones
    };

    this.funcionalidadesDTO.push(this.funcionalidadDTO);
    this.limpiarCampos()
   }

   enviarDTO(){
     console.log(this.funcionalidadesDTO);
     this.formService.postData(this.funcionalidadesDTO).subscribe(data => console.log(data))
   }
   
   limpiarCampos(){
    this.forma = this.fb.group({
      key: [this.forma.value.key],
      nombreCorto: [this.forma.value.nombreCorto],
      short: [this.forma.value.short],
      modulo:[''],
      descripcion: [''],
      archivo:[''],
      componente: [''],
      funcionalidad:['']
    })
    this.modulos = [];
    this.descripciones = [];
    this.proyectosSeleccionados = [];
   }
   
}
