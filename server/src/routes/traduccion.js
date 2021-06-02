let clase = '';
var funcion;
function traducir(nodo_actual) {
  if (nodo_actual.Tipo == "ERROR") {
    return "";
  }

  clase = "";
  recorrer(0, nodo_actual);

  return clase;
}

var aux = 0;
var tipo = 0;
var punto = 0;
function recorrer(variable, nodo_actual) {
  if (nodo_actual.Valor == "") { // es una cabeceRA
    // nodo_ast("AST","",0,0)
    //console.table(nodo_actual);
    //console.log(`Primer IF Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
    if (nodo_actual.hijos.length > 0) {
      //console.table(nodo_actual);
      switch (nodo_actual.Tipo) {
        case "interface":
          nodo_actual = null;
          break;
        case "clase":
          variable = 1;
          break;
        case "FUNCION":
          variable = 2;
          tipo = 1;
          break;
        case "METODO":
          variable = 2;
          tipo = 1;
          break;
        case "Lista_Parametros":
          variable = 3;
          break;
        case "PARAMETRO":
          variable = 4;
          tipo = 2;
          break;
        case "PARAMETROS":
          variable = 14;
          tipo = 2;
          break;
        case "DECLARACION":
          variable = 5;
          tipo = 2;
          break;
        case "Lista_id":
          variable = 6;
          tipo = 2;
          break;
        case "EXP":
          variable = 7;
          tipo = 2;
          break;
        case "ASIGNACION":
          variable = 8;
          tipo = 2;
          break;
        case "FOR":
          variable = 9;
          tipo = 2;
          break;
        case "WHILE":
          variable = 10;
          tipo = 2;
          break;//ciclo_while 
        case "Do_WHILE":
          variable = 11;
          tipo = 2;
          break;//DI ciclo_while 
        case "IF":
          variable = 12;
          tipo = 2;
          break;//IF
        case "RETORNO":
          variable = 13;
          tipo = 2;
          break;//Retorno
        case "BREAK":
          variable = 13;
          tipo = 2;
          break;//break
        case "CONTINUE":
          variable = 13;
          tipo = 2;
          break;//continue
        case "LLAMADA":
          variable = 14;
          tipo = 2;
          break;//llamada
        case "IMPRIMIR":
          variable = 15;
          tipo = 2;
          break;//imprimir
        case "METODO_MAIN":
          variable = 16;
          tipo = 2;
          break;//main
        default:
          variable = 0;
          //console.log(`\tVariable ${variable} Tipo: ${nodo_actual.Tipo}`)
          break;

      }
      if (nodo_actual != null) {

        for (let hijo of nodo_actual.hijos) {
          recorrer(variable, hijo);
        }
      }
      // console.log(`\tIF Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)

    }
  } else {
    if (nodo_actual.hijos.length > 0) {
      // console.table(nodo_actual);
      //clase += `${nodo_actual.Traduccion} `;

      switch (nodo_actual.Tipo) {
        case "condicion_else":
          clase += `${nodo_actual.Valor} `;
          break;
      }

      for (let hijo of nodo_actual.hijos) {
        recorrer(variable, hijo);
      }

    } else {
      //console.log(`\tVariable ${variable} Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
      // Las palabras que acompa;an a la instruccion
      // CLASE
      if (variable == 1) {
        //console.log(`C1 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "Res_Class":
            clase += `${nodo_actual.Valor} `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Llave_Abierta":
            clase += `${nodo_actual.Valor}\n`;
            clase += "\nconstructor(){\n\n}\n"
            break;
          case "Llave_Cerrada":
            clase += `${nodo_actual.Valor}\n`;
            break;
        }
      }
      // fUNCIONES Y METODOS
      else if (variable == 2) {
        //console.log(`C2 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "Tipo":
            clase += `\nfuction `;
            break;
          case "Res_Void":
            clase += `fuction `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor}`;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor}`;
            break;
          case "Llave_Abierta":
            clase += `${nodo_actual.Valor}\n`;
            break;
          case "Llave_Cerrada":
            clase += `${nodo_actual.Valor}\n`;
            break;
        }
      }
      // LISTA PARAMETROS
      else if (variable == 3) {
        //console.log(`C3 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
        }
      }
      // PARAMETRO
      else if (variable == 4) {
        //console.log(`14 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "Tipo":

            break;

          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
        }
      }
      // DECLARACION
      else if (variable == 5) {
        //console.log(`C5 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "Tipo":
            clase += `var `;
            break;

          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Igual":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor}\n `;
            break;
        }
      }
      // Lista Identificadores
      else if (variable == 6) {
        //console.log(`C6 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {

          case "Tipo":

            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
        }
      }
      // EXP
      else if (variable == 7) {
        //console.log(`C7 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "op_aritmetica":
            clase += `${nodo_actual.Valor} `;
            break;
          case "op_relacional":
            clase += `${nodo_actual.Valor} `;
            break;
          case "op_logica":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Adicion":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor} `;
            break;
        }
      }
      // ASIGNACION
      else if (variable == 8) {
        // console.log(`C8 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Decremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Incremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Igual":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor}\n `;
            break;
        }
      }
      // FOR
      else if (variable == 9) {
        //console.log(`C9 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "ciclo_for":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Llave_Abierta":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "Llave_Cerrada":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Decremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Incremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Igual":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor} `;
            break;

        }
      }
      // WHILE
      else if (variable == 10) {
        // console.log(`C10 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "ciclo_while":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Llave_Abierta":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "Llave_Cerrada":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Decremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Incremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Igual":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor} `;
            break;

        }
      }
      // DO WHILE
      else if (variable == 11) {
        //console.log(`C11 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "ciclo_do":
            clase += `${nodo_actual.Valor} `;
            break;
          case "ciclo_while":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Llave_Abierta":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "Llave_Cerrada":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Decremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Incremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Igual":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor}\n `;
            break;

        }
      }
      // IF
      else if (variable == 12) {
        // console.log(`C12 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "condicion_if":
            clase += `${nodo_actual.Valor} `;
            break;
          case "condicion_else":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Llave_Abierta":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "Llave_Cerrada":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Decremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Incremento":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Igual":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor}\n `;
            break;

        }
      }
      // Return, Continue, Brak;
      else if (variable == 13) {
        //console.log(`C13 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "Res_Return":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Res_Breack":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Res_Continue":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
        }

      }
      // LLAMADA
      else if (variable == 14) {
        //console.log(`C14 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)

        switch (nodo_actual.Tipo) {
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Coma":
            clase += `${nodo_actual.Valor} `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
        }

      }
      // Print
      else if (variable == 15) {
        //console.log(`C15 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "punto":
            if (punto == 1) {
              clase += `${nodo_actual.Valor}`;
              punto = 0;
              break;
            }
            punto++;
            break;
          case "System":
            break;
          case "Res_Out":
            clase += `console`;
            break;
          case "Res_Print":
            clase += `log`;
            break;
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor}`;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor}`;
            break;
          case "Punto_Coma":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "identificador":
            clase += `${nodo_actual.Valor} `;
            break;
          case "cadena":
            clase += `${nodo_actual.Valor} `;
            break;
          case "int":
            clase += `${nodo_actual.Valor} `;
            break;
          case "double":
            clase += `${nodo_actual.Valor} `;
            break;
          case "boolean":
            clase += `${nodo_actual.Valor} `;
            break;
          case "char":
            clase += `${nodo_actual.Valor} `;
            break;
        }
      }
      // Main
      else if (variable == 16) {
        //console.log(`C16 Tipo: ${nodo_actual.Tipo} Valor: ${nodo_actual.Valor}`)
        switch (nodo_actual.Tipo) {
          case "Parentesis_Abierto":
            clase += `${nodo_actual.Valor}`;
            break;
          case "Parentesis_Cerrado":
            clase += `${nodo_actual.Valor}`;
            break;
          case "Llave_Abierta":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "Llave_Cerrada":
            clase += `${nodo_actual.Valor}\n `;
            break;
          case "Res_Main":
            clase += `${nodo_actual.Valor}`;
            break;
        }

      }
    }
  }
  return clase;
}


module.exports = traducir;