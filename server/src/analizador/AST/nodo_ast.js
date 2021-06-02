"use strict";

class Nodo_ast{
    constructor ( tipo, valor,fila, columna, traduccion) { 
        this.Tipo = tipo;
        this.Valor = valor;
        this.Fila = fila;
        this.Columna = columna;
        this.Traduccion = traduccion;
        this.hijos = new Array();
    }

     getLinea() {
        return this.Fila;
    }

}

module.exports = Nodo_ast; 