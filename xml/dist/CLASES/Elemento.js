"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elemento = void 0;
class Elemento {
    constructor(identificador, texto, linea, columna, lista_atributos, lista_elementos) {
        this.identificador = identificador;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.lista_atributos = lista_atributos;
        this.lista_elementos = lista_elementos;
        //console.log("Hijos insertados: ",lista_elementos);
    }
}
exports.Elemento = Elemento;
