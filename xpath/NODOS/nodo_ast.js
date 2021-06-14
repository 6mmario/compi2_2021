"use strict";

class Nodo_ast {
    constructor(tipo, valor, fila, columna) {
        this.Tipo = tipo;
        this.Valor = valor;
        this.Fila = fila;
        this.Columna = columna;
        this.hijos = new Array();
    }

    getLinea() {
        return this.Fila;
    }

}

module.exports = Nodo_ast;