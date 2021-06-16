"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import {Atributo } from '../CLASES/Atributo';
const analizador = require('./GRAMATICAS/Gramatica1');
const analizadorDesc = require('./GRAMATICAS/gdesc');
console.log("Esta funcionando todo");
//const ambito:Ambito = new Ambito(null);
//let hash:{ [id:string] : string }; // Tabla hash, que representa la tabla de simbolos interna del ambito
//hash = {};
//hash['hola'] = 'hola';
// <-- comentario -->
const objetos = analizadorDesc.parse(`+<!--00
  esto es un comentario
-->
<?xml version="1.0" encoding="UTF-8"?>
<bookstore libreria="Usac" ciudad="Guatemala">
  <book category="children">
  <!--00
  esto es un comentario
-->
          hola    &amp; mundo
    <title>   !ABC ABC</title>
    <author>!2013 = "abc_123"
    continuacion </author>
    <year>2005</year>
    <price>
        29.99
        <WORK>ABC</WORK>
    </price>
  </book>
  <book2 category="web &amp;">
    <title2>Learning   XML</title2>
    <author2>Erik     T. Ray = ""?</author2>
    <year2>2003</year2>
    <price2>39.95</price2>
  </book2>
</bookstore>
`);
/*const objetos = analizador.parse(`
<?xml version="1.0" encoding="UTF-8"?>
<bookstore libreria="Usac" ciudad="Guatemala">
  <book category="children">
          hola    &amp; mundo
    <title>   !ABC ABC</title>
    <author>!2013 = "abc_123"
    continuacion </author>
    <year>2005</year>
    <price>
        29.99
        <WORK>ABC</WORK>
    </price>
  </book>
  <book2 category="web &amp;">
    <title2>Learning   XML</title2>
    <author2>Erik     T. Ray = ""?</author2>
    <year2>2003</year2>
    <price2>39.95</price2>
  </book2>
</bookstore>
`);*/
//console.log(typeof elementos);
var erroresParserXml; // Variable global para almacenar los valores del xml
let elementoRaiz = objetos['elemento']; //['elemento'];
//var nodoCSTRaiz: nodoCST = <nodoCST> objetos['nodoCST'];
//var DOTCST:string = nodoCSTRaiz.generarDotString();
const ambitoGlobal = elementoRaiz.construirTablaSimbolos(null); // construirTablaSimbolos es funcion recursiva
console.log(ambitoGlobal);
console.log("Errores encontrados:\n", objetos['errores']);
//console.log(DOTCST);
let var1 = "bienvenido";
var myTable = document.createElement("table");
/*let string = `<tr>
     <th>Tipo de Error</th>
    <th>Texto erroneo</th>
    <th>Fila</th>
    <th>Columna</th>
  </tr>
  <tr><td>hola ti</td><td>hola ño</td></tr>`; */
//Set its unique ID.
myTable.id = 'table_id';
//Add your content to the DIV
myTable.innerHTML = generarTablaErroresHtml(objetos['errores']);
document.body.appendChild(myTable);
function generarTablaErroresHtml(tabla) {
    let tHtml = "<tr> <th>Tipo de Error</th> <th>Texto erroneo</th> <th>Fila</th> <th>Columna</th> </tr>\n"; // cabecera de la tabla
    tabla.forEach(e => {
        tHtml += `<tr> 
      <td>${e.tipoError}</td>
      <td>${e.texto}</td>
      <td>${e.linea}</td>
      <td>${e.columna}</td>
      </tr>\n`;
    });
    return tHtml;
}
console.log(generarTablaErroresHtml(objetos['errores']));
