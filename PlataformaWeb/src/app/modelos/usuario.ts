import {Rol} from './rol'

export class Usuario {

    constructor(
        public activo: String,
        public clave: String,
        public correo: String,
        public id: number,
        public nombre: String,
        public roles :Rol[]
        //public roles : Rol,
    ){}

}
