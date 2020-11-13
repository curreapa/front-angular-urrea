import { Descripcion } from '../modelo/Descripcion';
import { Proyecto } from '../modelo/Proyecto';
import { Modulo } from '../modelo/Modulo';
import { Privilegio } from './Privilegio';
import { Funcionalidad } from './Funcionalidad';

export interface FuncionalidadDTO {
    funcionalidad: Funcionalidad,
    privilegio: Privilegio,
    modulos: Array<Modulo>,
    proyectos: Array<Proyecto>,
    descripcion: Array<Descripcion>,
}
