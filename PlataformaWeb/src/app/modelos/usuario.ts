import {Rol} from './rol'

export class Usuario {
    activo: String;
    clave: String;
    correo: String;
    id: number;
    nombre: String;
    roles : Rol[];
}
