import { AST } from "../CLASES/AST";
import { Ambito } from "../CLASES/Ambito";
import { Simbolo } from "../CLASES/Simbolo";
import { Tipo } from "../CLASES/Tipo";
import { Atributo } from "../CLASES/Atributo";
//import { Objeto } from "../CLASES/Objeto";
import { Instruccion } from "../CLASES/Instruccion";

import gramatica1 = require('../xml/GRAMATICAS/gramatica1');
import gramatica = require('../xpath/Gramatica/gramatica');

function ejecutarCodigo(){
    var entradaXML = getXML();
    var entradaQuery = getXPath();
    const xml = gramatica1.parse(entradaXML);
    const query = gramatica.parse(entradaQuery);
    const entornoGlobal:Ambito = new Ambito(null);

    xml.array.forEach((elemento:Atributo) => {
        console.log(elemento.identificador);
    });

}