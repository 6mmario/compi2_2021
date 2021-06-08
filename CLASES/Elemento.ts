import { Atributo } from "./Atributo";

export class Elemento{

    identificador:string;
    texto:string;
    linea:number;
    columna:number;
    lista_atributos:Array<Atributo>;
    lista_elementos:Array<Elemento>;

    constructor(identificador:string, texto:string, linea:number, columna:number,lista_atributos:Array<Atributo>, lista_elementos:Array<Elemento>){
        this.identificador = identificador;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.lista_atributos = lista_atributos;
        this.lista_elementos = lista_elementos;
        //console.log("Hijos insertados: ",lista_elementos);
    }

}