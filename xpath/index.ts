const gramatica = require('../Gramatica/gramatica');
//TODO Se importa el nodo_AST que sera CST
const nodo_ast = require('../NODOS/nodo_ast')
var fs = require('fs');

//TODO variable para almacenar el cst
let arbol_cst = null; // variable para almacenar el ast resultante del analizis

function ejecutarCodigo(entrada: string) {
    arbol_cst = null;
    const objetos = gramatica.parse(entrada);
    arbol_cst = objetos.cst;
    //console.table(arbol_cst);
    var result = '';
    result = generar_astDinamico(arbol_cst);
}

var respuesta = "";
function generar_astDinamico(arbol: any) {
    respuesta = "";
    var astHTML = ""
    //console.log(arbol)
    astHTML += "graph \"\" \n{\n";
    if (arbol != null) {
        astHTML += recorrerArbol(0, arbol);
    }
    astHTML += "}"

    console.log(astHTML);
    return astHTML;
}

let i = 0;
let aux = 0;

function recorrerArbol(indice: number, nodo_actual: any) {
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




ejecutarCodigo(`
//title[@lang="en"] | /bookstore/position()<3 | //child::node()
`);