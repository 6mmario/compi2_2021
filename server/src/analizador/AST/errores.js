"use strict";

class Errores{
    constructor ( desc, tipo, fila, columna,sim) { 
        this.Tipo = tipo;
        this.Desc = desc;
        this.Fila = fila;
        this.Columna = columna;
        this.Simbolo = sim;
    }
}


module.exports = Errores  ;