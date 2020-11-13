
import { FuncionalidadDTO } from '../modelo/funcionalidad-dto';
export interface RegistroDTO {
    clavePrivilegio: String,
    nombreCorto: String,
    short: String,
    funcionalidad: Array<FuncionalidadDTO>
}
