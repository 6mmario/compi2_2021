"use strict";
var fs = require('fs');
const nodo_ast = require("../Analizador/AST/nodo_ast.js");
const error = require("../Analizador/AST/errores.js");
const traducir = require("./traduccion.js")
var parse = require('dotparser');

var util = require('util'),
  graphviz = require('graphviz');

const { Router } = require("express");
const rauter = Router();

//---- variables para almacenar los ast y errores
var errores; // variable para almacenar la lista de errores
let arbol_ast = null; // variable para almacenar el ast resultante del analizis

//------------------------------------------------------------------------------
const analizador = require("../Analizador/gramatica.js");
const { writeFile } = require("fs");
const { Console } = require('console');
//------------------------------------------rutas de peticiones del servidor

rauter.post("/analizar", (req, res) => {
  var result = "";
  const { Entrada } = req.body;

  result = parser(Entrada);
  res.send({results: result});
});

rauter.get('/errores', (req, res) => {
  try {
    var result = tabla_errores(errores);
    res.send({results: result});
  } catch (e) {
    res.send("404");
  }
});

var conteo = 0;
var concatenar = "";
rauter.get('/tokens', (req, res) => {
  try {
    concatenar = "";
    conteo = 0;
    mostrarPalabras(arbol_ast);
    
    //var tra = traducir(arbol_ast);
    //console.log(tra);
    res.send({results:concatenar});
  } catch (e) {
    res.send("404");
  }
});

var concat = "";
rauter.get('/descargarJS', (req, res) => {
  try {   

    concat = "";
    concat = traducir(arbol_ast);
    //console.log(tra);
    res.send({results: concat});
  } catch (e) {
    res.send("404");
  }
});

rauter.get('/AST', (req, res) => {
  try {
    var result = '';
    result = generar_astDinamico(arbol_ast);

    res.send({results: result});
  } catch (e) {
    res.send("404");
  }
});

//----------------------------------------- funcionalidades del servidor
function parser(entrada) {
  errores = new Array();
  arbol_ast = null;
  try {
    let resultado = null;
    resultado = analizador.parse(entrada);
    errores = resultado.L_errores;

    // corregir los errores
    try {
      errores = corregir_errores(errores);
    } catch (e) {
      console.log("entro en el try de errores" + e);
    }
    //------------------
    arbol_ast = resultado.ast;

    var respuesta = "";
    if (errores.length == 0) {
      respuesta =
        "Se completo el analisis  con exito y se cargo el archivo principal \n";
    } else {
      respuesta =
        "Se completo el analisis, se cargo el archivo principal. \n Se detectaron los siguientes errores: \n";
      for (let error_actual of errores) {
        respuesta +=
          error_actual.Tipo +
          "-" +
          error_actual.Desc +
          "- fila:" +
          error_actual.Fila +
          "- columna:" +
          error_actual.Columna +
          "\n";
      }
    }
    return respuesta;
  } catch (e) {
    // console.log("entro a errores");
    arbol_ast == null;
    return "Error al compilar la entrada: " + e;
  }
}

function mostrarPalabras(nodo_actual) {
  if (nodo_actual.Tipo == "ERROR") {
    return "";
  }

  if (nodo_actual.Valor == "") { // es una cabeceRA
    // console.log("entro a cabecera");
    if (nodo_actual.hijos.length > 0) {
      
      //console.log("1"+ nodo_actual.Tipo); 
      for (let hijo of nodo_actual.hijos) {
        mostrarPalabras(hijo);
      }

    } else {
      console.log("2\t" + nodo_actual.Tipo);
    }
  } else {
    conteo++;
    if (nodo_actual.hijos.length > 0) {
      
      concatenar += "<tr> \n";
      concatenar += "  <td>" + conteo + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Tipo + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Valor + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Fila + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Columna + "</td> \n";
      concatenar += "</tr> \n";
      //console.log("Valor: " + nodo_actual.Valor + " Tipo: " + nodo_actual.Tipo + " Fila: " + nodo_actual.Fila + " Columna: " + nodo_actual.Columna);
      for (let hijo of nodo_actual.hijos) {
        mostrarPalabras(hijo);
      }

    } else {
      concatenar += "<tr> \n";
      concatenar += "  <td>" + conteo + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Tipo + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Valor + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Fila + "</td> \n";
      concatenar += "  <td>" + nodo_actual.Columna + "</td> \n";
      concatenar += "</tr> \n";
      //console.log("Valor: " + nodo_actual.Valor + " Tipo: " + nodo_actual.Tipo + " Fila: " + nodo_actual.Fila + " Columna: " + nodo_actual.Columna);
    }
  }
}

function tabla_errores(lista_errores) {
  var respuesta = "";
  var cont = 0;
  for (let error_actual of lista_errores) {
    cont++;
    respuesta += "<tr> \n";
    respuesta += "  <td>" + cont + "</td> \n";
    respuesta += "  <td>" + error_actual.Tipo + "</td> \n";
    respuesta += "  <td>" + error_actual.Desc + "</td> \n";
    respuesta += "  <td>" + error_actual.Fila + "</td> \n";
    respuesta += "  <td>" + error_actual.Columna + "</td> \n";
    respuesta += "</tr> \n";
  }
  //console.log(respuesta);
  return respuesta;
}

var respuesta = "";
function generar_astDinamico(arbol) {
  respuesta = "";
  var astHTML = ""
  //console.log(arbol)
  astHTML += "graph \"\" \n{\n";
  if (arbol != null) {
    astHTML += recorrerArbol(0, arbol);
  }
  astHTML += "}"
  //console.log(astHTML);

  fs.writeFile('src/routes/arbol.dot', astHTML, function (err) {
    //fs.writeFile('arbol.dot', astHTML, function (err) {
    // If an error occurred, show it and return
    if (err) return console.error(err);
    // Successfully wrote to the file!
  });

  //console.log(astHTML);
  return astHTML;
}


let i = 0;
let aux = 0;
function recorrerArbol(indice, nodo_actual) {
  if (nodo_actual.Tipo == "ERROR") {
    return "";
  }
  //console.table(nodo_actual)
  if (nodo_actual.hijos.length > 0) {

    //console.log(nodo_actual.Tipo + (indice).toString());
    respuesta += nodo_actual.Tipo + (indice).toString() + "\n";

    if (nodo_actual.Valor != "") {
      //console.log(nodo_actual.Tipo + (indice) + " [label = \"" + nodo_actual.Valor + "\"]");
      respuesta += nodo_actual.Tipo + (indice) + " [label = \"" + nodo_actual.Valor + "\"]\n"
    } else {
      //console.log(nodo_actual.Tipo + (indice) + " [label = \"" + nodo_actual.Tipo + "\"]")
      i++;
      respuesta += nodo_actual.Tipo + (indice) + " [label = \"" + nodo_actual.Tipo + "\"]\n"
    }


    for (let hijo of nodo_actual.hijos) {
      //console.log(nodo_actual.Tipo + (indice) + ' -- \"' + hijo.Tipo + i + "\"")
      respuesta += nodo_actual.Tipo + (indice) + ' -- \"' + hijo.Tipo + i + "\"\n"
      if (hijo.Valor != "") {
        var cadena = hijo.Valor
        //console.log("\"" + hijo.Tipo + i + "\"" + " [label = \"" + cadena.replace(/['"]+/g, '') + "\"]")
        respuesta += "\"" + hijo.Tipo + i + "\"" + " [label = \"" + cadena.replace(/['"]+/g, '') + "\"]\n"
      } else {
        //console.log("\"" + hijo.Tipo + i + "\"" + " [label = \"" + hijo.Tipo + "\"]")
        respuesta += "\"" + hijo.Tipo + i + "\"" + " [label = \"" + hijo.Tipo + "\"]\n"
      }

      
     
      recorrerArbol(i, hijo)
      
    }
  }
  i++;
  return respuesta;
}

//---- corregir lista de errores
function corregir_errores(l_errores) {
  let new_lista = new Array();
  let cont = 0;
  let aux = l_errores[0];
  for (let error of l_errores) {
    if (error.Tipo == "SINTACTICO") {
      if (cont == 0) {
        if (error.Simbolo == ";" || error.Simbolo == "}") {
        } else {
          //  console.log("simbolo -> -"+error.Simbolo+"-");
          new_lista.push(error);
        }
      }
      cont++;
      if (error.Simbolo == ";" || error.Simbolo == "}") {
        cont = 0;
      }

      if (error.Fila == aux.Fila) {
      } else {
        cont = 0;
      }
    } else {
      new_lista.push(error);
    }
    aux = error;
  }

  return new_lista;
}
//----------------------------

module.exports = rauter;
