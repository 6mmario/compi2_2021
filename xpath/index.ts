const gramatica = require('../Gramatica/gramaticaV2');
const descgramatica = require('../Gramatica/descgramatica');


//TODO variable para almacenar el cst
let arbol_cst = null; // variable para almacenar el ast resultante del analizis
let arbol_ast = null; // variable para almacenar el ast resultante del analizis

function ejecutarCodigo(entrada: string) {
    arbol_cst = null;
    arbol_ast = null;
    const objetos = gramatica.parse(entrada);
    arbol_cst = objetos.cst;
    arbol_ast = objetos.cst;
    //console.table(arbol_cst);
    var result = '';
    var rg = '';
    result = generar_astDinamico(arbol_cst);
    localStorage.setItem("cst",result);
    //result = generar_astDinamicoAST(arbol_ast)
    rg = generar_astDinamicoRG(arbol_cst);
    localStorage.setItem("rg",rg);
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

var resrg = '';
let contador: number = 0;
function generar_astDinamicoRG(arbol: any) {
    resrg = "";
    contador = 0;
    var astHTML = ""
    //console.log(arbol)
    astHTML += `<tbody>`;
    if (arbol != null) {
        astHTML += recorrerArbolRG(0, arbol);
    }
    astHTML += `</tbody>`

    console.log(astHTML);
    return astHTML;
}


function recorrerArbolRG(indice: number, nodo_actual: any) {
    if (nodo_actual.Tipo == "ERROR") {
        return "";
    }

    if(nodo_actual.Regla != undefined){
        if(nodo_actual.Tipo === 'CST') nodo_actual.Tipo = 'S'
        contador++;
        //console.log(`<tr>\n<td>${contador}</td>\n<td>${nodo_actual.Tipo}</td>\n <td>${nodo_actual.Regla}</td>\n</tr>`);
        resrg += `<tr>\n<td>${contador}</td>\n<td>${nodo_actual.Tipo}</td>\n <td>${nodo_actual.Regla}</td>\n</tr>`;
}
    if (nodo_actual.hijos.length > 0) {

        for (let hijo of nodo_actual.hijos) {
            recorrerArbolRG(i, hijo)
        }
    }
    return resrg;
}

ejecutarCodigo(`//hola/hjola`)


