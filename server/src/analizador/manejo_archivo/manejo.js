"use strict";
const nodo_clase = require('../manejo_archivo/clase');
const nodo_variable = require('../manejo_archivo/variable');
const nodo_funcion = require('../manejo_archivo/funcion');
const nodo_parametro = require('../manejo_archivo/parametro');
const nodo_inter = require('../manejo_archivo/inter')

function obter_clase(arbol) {
    var arreglo_clases = new Array();
    let lista_variables = new Array();
    let lista_funciones = new Array();
    let lista_condiciones = new Array();
    var arreglo_inter = new Array();

   
    //recorrer los hijos del nodo ast para obtener las clases 
    for (let nodo of arbol.hijos) {
        
        if (nodo.Tipo == "clase") {
            var clase_nueva = new nodo_clase(nodo.Valor);
            //obtener variables globales de la clase
            clase_nueva.variables_globales = obtener_variables_globales(nodo, nodo.Valor, "global");
            lista_variables = lista_variables.concat(clase_nueva.variables_globales);
            // obtener funciones de la clase 
            clase_nueva.funciones = obtener_funciones(nodo);
            for (let fun of clase_nueva.funciones) {  // agrega las variables de cada funcion a la lista general
                lista_variables = lista_variables.concat(fun.variables);
            }
            // guarda todas las funciones de todas las clases en una lista
            lista_funciones = lista_funciones.concat(clase_nueva.funciones);
            //se guarda la calse con sus funciones y sus variables globales
            arreglo_clases.push(clase_nueva);
        }

        if (nodo.Tipo == "interface") {
            var clase_nueva = new nodo_clase(nodo.Valor);
            //obtener variables globales de la clase
            clase_nueva.variables_globales = obtener_variables_globales(nodo, nodo.Valor, "global");
            lista_variables = lista_variables.concat(clase_nueva.variables_globales);
            // obtener funciones de la clase 
            clase_nueva.funciones = obtener_funciones(nodo);
            for (let fun of clase_nueva.funciones) {  // agrega las variables de cada funcion a la lista general
                lista_variables = lista_variables.concat(fun.variables);
            }
            // guarda todas las funciones de todas las clases en una lista
            lista_funciones = lista_funciones.concat(clase_nueva.funciones);
            //se guarda la calse con sus funciones y sus variables globales
            arreglo_clases.push(clase_nueva);
        }
    }
    
/*
    //imprimir el listado de clases para verificar 
    for (let clase of arreglo_clases) {
        console.log("clase -> " + clase.Nombre);
        console.log("   variables globales -> ");
        for (let var_ of clase.variables_globales) {
            console.log("       -" + var_.Tipo + " " + var_.Nombre);
        }
        console.log("   funciones y metodos ->");
        for (let fun of clase.funciones) {
            console.log("     -tipo: " + fun.Tipo + " nombre:" + fun.Nombre);
            console.log("       *parametros:");
            for (let para of fun.parametros) {
                console.log("           tipo: " + para.Tipo + " nombre: " + para.Nombre);
            }
            console.log("       *Variables:");
            for (let var_fun of fun.variables) {
                console.log("           var-> " + var_fun.Tipo + " " + var_fun.Nombre);
            }
        }
    }
    
    console.log("*********************** todas las varibles del archivo ***********************");
    let i = 0;
    for (let var_ of lista_variables) {
        i++;
        console.table(var_);
        // console.table(i + " var-> " + var_.Tipo + " - " + var_.Nombre + " - " + var_.func + " - " + var_.clase);
    }
    i = 0;
    console.log("*********************** todas las funciones del archivo ***********************");
    for (let fun of lista_funciones) {
        i++;
        console.log(i + " funcion-> " + fun.Tipo + " - " + fun.Nombre + " -clase: " + fun.clase + " -parametros: ");
        for (let para of fun.parametros) {
            console.log("   " + para.Tipo + " - " + para.Nombre);
        }
    }
*/
    return { clases: arreglo_clases, funciones: lista_funciones, variables: lista_variables };
}

function obtener_variables(nodo, nom_clase, nom_funcion) {
    var varibles = new Array();

    for (let actual of nodo.hijos) {
        if (actual.Tipo == "DECLARACION") {
            
            let tipo_var = actual.hijos[0].Valor;
            // la declaracion puede tener una lista de id
            let l_id = actual.hijos[1].hijos;
            for (let id of l_id) {
                varibles.push(new nodo_variable(id.Valor, tipo_var, nom_funcion, nom_clase));
            }
        } else if (actual.Tipo == "ERROR") {

        } else {
            if (actual.hijos.length > 0) { // si tiene hijos
                let lista_var_hijo = obtener_variables_entorno(actual, nom_clase, nom_funcion);
                varibles = varibles.concat(lista_var_hijo);
            }
        }
    }
    return varibles;
}

function obtener_variables_entorno(nodo, nom_clase, nom_funcion) {
    let lista_var = new Array();
    for (let actual of nodo.hijos) {
        if (actual.Tipo == "DECLARACION") {
            let tipo_var = actual.hijos[0].Valor;
            let l_id = actual.hijos[1].hijos;
            for (let id of l_id) {
                lista_var.push(new nodo_variable(id.Valor, tipo_var, nom_funcion, nom_clase));
            }
        } else if (actual.Tipo == "ERROR") {

        } else {
            if (actual.hijos.length > 0) {
                let lista_var_hijo = obtener_variables_entorno(actual, nom_clase, nom_funcion);
                lista_var = lista_var.concat(lista_var_hijo);
            }
        }
    }
    return lista_var;
}

function obtener_variables_globales(nodo, nom_clase, nom_funcion) {
    var varibles = new Array();

    for (let actual of nodo.hijos) {
        if (actual.Tipo == "DECLARACION") {
            
            let tipo_var = actual.hijos[0].Valor;
            // la declaracion puede tener una lista de id
            let l_id = actual.hijos[1].hijos;
            for (let id of l_id) {
                varibles.push(new nodo_variable(id.Valor, tipo_var, nom_funcion, nom_clase));
            }
        } else if (actual.Tipo == "ERROR") {

        } else if (actual.Tipo != "FUNCION" && actual.Tipo != "METODO") {
            if (actual.hijos.length > 0) { // si tiene hijos
                let lista_var_hijo = obtener_variables_entorno(actual, nom_clase, nom_funcion);
                varibles = varibles.concat(lista_var_hijo);
            }
        }
    }
    return varibles;
}


function obtener_funciones(nodo_clase) {
    let l_funciones = new Array();

    for (let actual of nodo_clase.hijos) {
        if (actual.Tipo == "FUNCION" || actual.Tipo == "METODO") {
            let funcion_ = actual.hijos;
            let nueva_funcion;
            // console.log("funcion -->"+actual.hijos[1].Valor);
            nueva_funcion = new nodo_funcion(funcion_[1].Valor, funcion_[0].Valor, nodo_clase.Valor);
            //obtener los parametros
            let lista_parametros = actual.hijos[2];
            for (let para of lista_parametros.hijos) {
                nueva_funcion.parametros.push(new nodo_parametro(para.hijos[1].Valor, para.hijos[0].Valor));
            }

            //obtener las variables dentro de la funcion 
            nueva_funcion.variables = obtener_variables(actual.hijos[3], nodo_clase.Valor, funcion_[1].Valor);
            l_funciones.push(nueva_funcion);
        }
    }

    return l_funciones;
}
module.exports = { obter_clase };