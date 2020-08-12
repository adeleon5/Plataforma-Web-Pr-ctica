import {Rol} from './rol'

export class Usuario {

    //constructor(
        //public roles : Rol,
    //){}
    constructor(){}

    activo:string;
    clave: string;
    correo: string;
    id: number;
    nombre: string;
    roles :Rol[]

}
