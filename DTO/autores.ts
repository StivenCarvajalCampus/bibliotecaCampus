import {Expose, Type , Transform} from 'class-transformer';
import {  IsString, IsNotEmpty, Matches,IsNumber,IsDate, isNumber, isNotEmpty, validate, IsDefined } from 'class-validator';


export class Autores{
    

    @Expose({name : 'nombre'})
    @Transform(
        ({value})=>{ if(/^[a-z A-Z0-9]+$/.test(value)) return value; else throw {status:400, message:"El parametro nombre no cumple con los parametros establecidos"};
    },{toClassOnly:true})
    nombre:string;
    
    
    constructor(
        nombre:string,
    ){
        this.nombre = nombre;
    }
}class idInsumo {
    @IsNotEmpty()
    id_insumo:number
}