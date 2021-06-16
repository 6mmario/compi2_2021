(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambito = void 0;
/* El ambito internamente almacenara una tabla de simbolos
    La tabla de simbolos podra contener cualquier tipo especificado en 'Tipo.ts'
*/
class Ambito {
    constructor(ambito_anterior) {
        this.ambito_anterior = ambito_anterior;
        this.tablaSimbolos = {};
    }
    agregar(id, simbolo) {
        this.tablaSimbolos[id] = simbolo; // insercion a la tabla hash.
    }
}
exports.Ambito = Ambito;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
class Atributo {
    constructor(identificador, valor, linea, columna) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Atributo = Atributo;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Elemento = void 0;
const Ambito_1 = require("./Ambito");
const Simbolo_1 = require("./Simbolo");
const Tipo_1 = require("./Tipo");
class Elemento {
    constructor(identificador, texto, linea, columna, lista_atributos, lista_elementos) {
        this.identificador = identificador;
        this.texto = texto;
        this.linea = linea;
        this.columna = columna;
        this.lista_atributos = lista_atributos;
        this.lista_elementos = lista_elementos;
        //this.ambito = new Ambito(null);
        //console.log("Hijos insertados: ",lista_elementos);
    }
    construirTablaSimbolos(ambitoAnterior) {
        console.log("INICIARE A EJECUTAR \n\n");
        this.ambito = new Ambito_1.Ambito(ambitoAnterior);
        // SI la this.lista_atributos esta vacia, el foreach no se ejecuta, ni da error
        this.lista_atributos.forEach(atributo => {
            var _a;
            //console.log('encontre->',e);
            const newSimbolo = new Simbolo_1.Simbolo(atributo.identificador, Tipo_1.Tipo.ATRIBUTO, atributo.linea, atributo.columna, atributo.valor); // SIMBOLO TIPO ATRIBUTO
            (_a = this.ambito) === null || _a === void 0 ? void 0 : _a.agregar(atributo.identificador, newSimbolo);
        });
        // SI la this.lista_elementos esta vacia, el foreach no se ejecuta, ni da error
        this.lista_elementos.forEach(elemento => {
            var _a;
            elemento.construirTablaSimbolos(this.ambito); // contruye la tabla de simbolos del elemento
            let newSimbolo = new Simbolo_1.Simbolo(elemento.identificador, Tipo_1.Tipo.ELEMENTO, elemento.linea, elemento.columna, elemento); // Almaceno el elemento en el Ambito actual
            (_a = this.ambito) === null || _a === void 0 ? void 0 : _a.agregar(elemento.identificador, newSimbolo);
        });
        return this.ambito; // Podria retornar un ambito que no contiene ni Etiquetas ni Atributos..
    }
}
exports.Elemento = Elemento;

},{"./Ambito":1,"./Simbolo":5,"./Tipo":6}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errores = void 0;
class Errores {
    constructor(texto, tipoError, linea, columna) {
        this.texto = texto;
        this.tipoError = tipoError;
        this.linea = linea;
        this.columna = columna;
    }
}
exports.Errores = Errores;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(id, tipo, linea, columna, valor) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.valor = valor;
    }
}
exports.Simbolo = Simbolo;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tipo = void 0;
var Tipo;
(function (Tipo) {
    Tipo[Tipo["ATRIBUTO"] = 0] = "ATRIBUTO";
    Tipo[Tipo["ELEMENTO"] = 1] = "ELEMENTO";
})(Tipo = exports.Tipo || (exports.Tipo = {}));

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodoCST = void 0;
class nodoCST {
    //mierda:[] = [];
    constructor(id, label) {
        this.idPadre = id;
        this.label = label.replace(/"/g, ''); // eliminar "
        this.hijos = []; // inicializamos el arreglo en vacio
    }
    generarDotString() {
        var _a;
        let stringDot = `${this.idPadre}[label = "${this.label}"]\n`;
        (_a = this.hijos) === null || _a === void 0 ? void 0 : _a.forEach(e => {
            console.log("INGRESO?", this.idPadre);
            stringDot += e.generarDotString();
            stringDot += `${this.idPadre}->${e.idPadre}; `;
        });
        return stringDot;
    }
}
exports.nodoCST = nodoCST;

},{}],8:[function(require,module,exports){
(function (process){(function (){
"use strict";
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var Gramatica1 = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 9], $V1 = [13, 16], $V2 = [1, 14], $V3 = [10, 13, 16], $V4 = [1, 27], $V5 = [1, 28], $V6 = [1, 29], $V7 = [1, 30], $V8 = [1, 31], $V9 = [8, 10, 17, 19, 20, 21, 22, 23], $Va = [5, 8, 10, 17, 19, 20, 21, 22, 23];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "TAGS": 4, "EOF": 5, "PROLOG": 6, "TAG": 7, "LT": 8, "qm": 9, "Tag_ID": 10, "Equal": 11, "Alphanumeric": 12, "GT": 13, "L_ATRIBUTOS": 14, "ELEMENTOS": 15, "F_Slash": 16, "strings": 17, "PREDEFINIDOS": 18, "lthan": 19, "gthan": 20, "amp": 21, "apos": 22, "quot": 23, "ATRIBUTOS": 24, "ATRIBUTO": 25, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 8: "LT", 9: "qm", 10: "Tag_ID", 11: "Equal", 12: "Alphanumeric", 13: "GT", 16: "F_Slash", 17: "strings", 19: "lthan", 20: "gthan", 21: "amp", 22: "apos", 23: "quot" },
        productions_: [0, [3, 2], [4, 2], [6, 11], [7, 9], [7, 8], [7, 5], [15, 2], [15, 2], [15, 2], [15, 2], [15, 1], [15, 1], [15, 1], [15, 1], [18, 1], [18, 1], [18, 1], [18, 1], [18, 1], [14, 1], [14, 0], [24, 2], [24, 1], [25, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    var raiz = new nodoCST('START' + conta++, 'START', []);
                    raiz.hijos.push($$[$0 - 1].nodoCST);
                    this.$ = { "elemento": $$[$0 - 1].elemento, "nodoCST": raiz };
                    return this.$; //this.$ = $$[$0-1]; /*console.log($$[$0-1], $$[$0]);*/ 
                    break;
                case 2:
                    var raiz = new nodoCST('TAGS' + conta++, 'TAGS');
                    raiz.hijos.push($$[$0 - 1].nodoCST); // TAGS -> PROLOG
                    raiz.hijos.push($$[$0].nodoCST); // TAGS -> TAG
                    this.$ = { "elemento": $$[$0].elemento, "nodoCST": raiz };
                    //this.$ = $$[$0].elemento; /*console.log($$[$0]);*///console.log($$[$0-1].nodo.crearNodosFormatoDOT());
                    break;
                case 3:
                    var raiz = new nodoCST('PROLOG' + conta++, 'PROLOG');
                    raiz.hijos.push(new nodoCST('LT' + conta++, '<'));
                    raiz.hijos.push(new nodoCST('qm' + conta++, '?'));
                    raiz.hijos.push(new nodoCST('Tag_ID' + conta++, String($$[$0 - 8])));
                    raiz.hijos.push(new nodoCST('Tag_ID' + conta++, String($$[$0 - 7])));
                    raiz.hijos.push(new nodoCST('Equal' + conta++, '='));
                    raiz.hijos.push(new nodoCST('Alphanumeric' + conta++, String($$[$0 - 5]).replace(/"/g, '')));
                    raiz.hijos.push(new nodoCST('Tag_ID' + conta++, String($$[$0 - 4])));
                    raiz.hijos.push(new nodoCST('Equal' + conta++, '='));
                    //factorizarString = String($$[$0-2]).replace(/"/g,'');
                    raiz.hijos.push(new nodoCST('Alphanumeric' + conta++, String($$[$0 - 2]).replace(/"/g, '')));
                    raiz.hijos.push(new nodoCST('qm' + conta++, String('?')));
                    raiz.hijos.push(new nodoCST('GT' + conta++, String('>')));
                    if (String($$[$0 - 7]).replace(/\s/g, '') == 'version')
                        if (String($$[$0 - 4]).replace(/\s/g, '') == 'encoding')
                            this.$ = { "encoding": $$[$0 - 2], "nodoCST": raiz }; // retornamos el encodigo que requiere
                        else
                            this.$ = null;
                    else
                        this.$ = null;
                    break;
                case 4:
                    var newElemento = new Elemento(String($$[$0 - 7]).replace(/\s/g, ''), $$[$0 - 4].texto, _$[$0 - 8].first_line, _$[$0 - 8].first_column, $$[$0 - 6].atributo, $$[$0 - 4].hijos); /*console.log('Tag->',$$[$0-7],'\n',$$[$0-4].hijos,'\n <-cerrar');*/
                    var tag = new nodoCST('TAG' + conta++, 'TAG');
                    tag.hijos.push(new nodoCST('LT' + conta++, '<'));
                    tag.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0 - 7]));
                    tag.hijos.push($$[$0 - 6].nodoCST);
                    tag.hijos.push(new nodoCST('GT' + conta++, '>'));
                    tag.hijos.push($$[$0 - 4].nodoCST);
                    tag.hijos.push(new nodoCST('LT' + conta++, '<'));
                    tag.hijos.push(new nodoCST('F_Slash' + conta++, '/'));
                    tag.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0 - 1]));
                    tag.hijos.push(new nodoCST('GT' + conta++, '>'));
                    this.$ = { "elemento": newElemento, "nodoCST": tag };
                    break;
                case 5:
                    var newElemento = new Elemento(String($$[$0 - 6]).replace(/\s/g, ''), $$[$0 - 3].texto, _$[$0 - 7].first_line, _$[$0 - 7].first_column, $$[$0 - 5].atributo, []);
                    var tag = new nodoCST('TAG' + conta++, 'TAG');
                    tag.hijos.push(new nodoCST('LT' + conta++, '<'));
                    tag.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0 - 6]));
                    tag.hijos.push($$[$0 - 5].nodoCST);
                    tag.hijos.push(new nodoCST('GT' + conta++, '>'));
                    tag.hijos.push(new nodoCST('LT' + conta++, '<'));
                    tag.hijos.push(new nodoCST('F_Slash' + conta++, '/'));
                    tag.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0 - 1]));
                    tag.hijos.push(new nodoCST('GT' + conta++, '>'));
                    this.$ = { "elemento": newElemento, "nodoCST": tag };
                    break;
                case 6:
                    var newElemento = new Elemento(String($$[$0 - 3]).replace(/\s/g, ''), $$[$0].texto, _$[$0 - 4].first_line, _$[$0 - 4].first_column, $$[$0 - 2].atributo, []);
                    var tag = new nodoCST('TAG' + conta++, 'TAG');
                    tag.hijos.push(new nodoCST('LT' + conta++, '<'));
                    tag.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0 - 3]));
                    tag.hijos.push($$[$0 - 2].nodoCST);
                    tag.hijos.push(new nodoCST('F_Slash' + conta++, '/'));
                    tag.hijos.push(new nodoCST('GT' + conta++, '>'));
                    this.$ = { "elemento": newElemento, "nodoCST": tag };
                    break;
                case 7:
                    var raiz = new nodoCST('ELEMENTOS' + conta++, 'ELEMENTOS');
                    //console.log("Que hay  antes? ", $$[$0-1].nodoCST,'\n\n');
                    raiz.hijos.push($$[$0 - 1].nodoCST); // ELEMENTOS -> ELEMENTOS
                    raiz.hijos.push($$[$0].nodoCST); // ELEMENTOS -> TAG
                    $$[$0 - 1].nodoCST = raiz; // Actualizamos el valor ya que raiz, contiene lo que $$[$0-1] tenia anteriormente
                    $$[$0 - 1].hijos.push($$[$0].elemento);
                    this.$ = $$[$0 - 1]; //  ---> $$[$0-1] = {texto: $$[$0-1].val, hijos:[], "nodoCST":raiz };     
                    break;
                case 8:
                    var elem = new nodoCST('ELEM' + conta++, 'ELEMENTOS');
                    elem.hijos.push($$[$0 - 1].nodoCST); // Almacenamos el hijo adentro del padre
                    elem.hijos.push(new nodoCST('strings' + conta++, $$[$0]));
                    $$[$0 - 1].nodoCST = elem; // Actualizamos lo que traia antes 
                    $$[$0 - 1].texto += $$[$0];
                    this.$ = $$[$0 - 1];
                    // console.log("Que retorno::posible error->",$$[$0-1]);
                    break;
                case 9:
                    var elem = new nodoCST('ELEM' + conta++, 'ELEMENTOS');
                    elem.hijos.push($$[$0 - 1].nodoCST); // Almacenamos el hijo adentro del padre
                    elem.hijos.push($$[$0].nodoCST);
                    $$[$0 - 1].nodoCST = elem; // Actualizamos lo que traia antes 
                    $$[$0 - 1].texto += $$[$0].val;
                    this.$ = $$[$0 - 1];
                    //console.log("Que retorno::posible error->",$$[$0-1]);
                    break;
                case 10:
                    var elem = new nodoCST('ELEM' + conta++, 'ELEMENTOS');
                    elem.hijos.push($$[$0 - 1].nodoCST); // Almacenamos el hijo adentro del padre
                    elem.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0]));
                    $$[$0 - 1].nodoCST = elem; // Actualizamos lo que traia antes 
                    $$[$0 - 1].texto += ('' + $$[$0]);
                    this.$ = $$[$0 - 1]; /*console.log('ELEMENTOS Tag_ID ->',$$[$0-1], $$[$0], '--> ', $$[$0-1]);*/
                    //console.log("Que retorno::posible error->",this.$);
                    break;
                case 11:
                    var raiz = new nodoCST('ELEMENTOS' + conta++, 'ELEMENTOS');
                    raiz.hijos.push($$[$0].nodoCST); // ELEMENTOS -> TAG    
                    //this.$ = $$[$0];    //  ---> $$[$0] = {texto: $$[$0].val, hijos:[], "nodoCST":raiz }; 
                    this.$ = { texto: '', hijos: [$$[$0].elemento], "nodoCST": raiz };
                    //console.log("Que retorno::posible error->",this.$);
                    break;
                case 12:
                    var elem = new nodoCST('ELEM' + conta++, 'ELEMENTOS');
                    elem.hijos.push(new nodoCST('strings' + conta++, $$[$0]));
                    this.$ = { texto: String($$[$0]), hijos: [], "nodoCST": elem }; /* console.log('strings ->', $$[$0],'END');*/
                    //console.log("strings->",this.$);
                    break;
                case 13:
                    var elem = new nodoCST('ELEM' + conta++, 'ELEMENTOS');
                    elem.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0]));
                    this.$ = { texto: String($$[$0]), hijos: [], "nodoCST": elem }; /*console.log('Tag_ID ->', $$[$0]);*/
                    //console.log("Que retorno::posible error->",this.$);
                    break;
                case 14:
                    var elem = new nodoCST('ELEM' + conta++, 'ELEMENTOS');
                    elem.hijos.push($$[$0].nodoCST); // ELEMENTOS --> PREDEFINIDOS
                    this.$ = { texto: $$[$0].val, hijos: [], "nodoCST": elem };
                    //console.log("Que retorno::posible error->",this.$);
                    break;
                case 15:
                    var pred = new nodoCST('PREDEFINIDOS' + conta++, 'PREDEFINIDOS');
                    pred.hijos.push(new nodoCST('lthan' + conta++, $$[$0]));
                    this.$ = { "val": String('<'), "nodoCST": pred };
                    break;
                case 16:
                    var pred = new nodoCST('PREDEFINIDOS' + conta++, 'PREDEFINIDOS');
                    pred.hijos.push(new nodoCST('gthan' + conta++, $$[$0]));
                    this.$ = { "val": String('>'), "nodoCST": pred };
                    break;
                case 17:
                    var pred = new nodoCST('PREDEFINIDOS' + conta++, 'PREDEFINIDOS');
                    pred.hijos.push(new nodoCST('amp' + conta++, $$[$0]));
                    this.$ = { "val": String('&'), "nodoCST": pred };
                    break;
                case 18:
                    var pred = new nodoCST('PREDEFINIDOS' + conta++, 'PREDEFINIDOS');
                    pred.hijos.push(new nodoCST('apos' + conta++, $$[$0]));
                    this.$ = { "val": String("'"), "nodoCST": pred };
                    break;
                case 19:
                    var pred = new nodoCST('PREDEFINIDOS' + conta++, 'PREDEFINIDOS');
                    pred.hijos.push(new nodoCST('quot' + conta++, $$[$0]));
                    this.$ = { "val": String('"'), "nodoCST": pred };
                    break;
                case 20:
                    var raiz = new nodoCST('L_ATRIBUTOS' + conta++, 'L_ATRIBUTOS');
                    raiz.hijos.push($$[$0].nodoCST);
                    this.$ = {
                        "atributo": $$[$0].atributo,
                        "nodoCST": raiz
                    }; //console.log('Que carajo tengo concatenoado\n', $$[$0].nodoCST, '\n\n');
                    break;
                case 21:
                    var raiz = new nodoCST('L_ATRIBUTOS' + conta++, 'L_ATRIBUTOS');
                    raiz.hijos.push(new nodoCST('epsilon' + conta++, 'epsilon-empty'));
                    this.$ = { "atributo": [], "nodoCST": raiz };
                    break;
                case 22:
                    $$[$0 - 1].atributo.push($$[$0].atributo); //this.$ = $$[$0-1];
                    let raizA2 = new nodoCST('ATRIBUTOS' + conta++, 'ATRIBUTOS');
                    raizA2.hijos.push($$[$0 - 1].nodoCST);
                    raizA2.hijos.push($$[$0].nodoCST);
                    //var uniqueId = 'ATRIBUTOS' + conta++; // id de la produccion padre
                    //let newDotString      = uniqueId + '[label = "ATRIBUTOS"] ';   
                    //    newDotString      +=  $$[$0-1].DOTstring+ '\n' + $$[$0].DOTstring + uniqueId + '->' + $$[$0-1].uniqueId + ';' + uniqueId + '->' + $$[$0].uniqueId + ';';   
                    this.$ = {
                        "atributo": $$[$0 - 1].atributo,
                        //"uniqueId": uniqueId,
                        "nodoCST": raizA2
                    };
                    break;
                case 23:
                    let raizA = new nodoCST('ATRIBUTOS' + conta++, 'ATRIBUTOS');
                    raizA.hijos.push($$[$0].nodoCST);
                    this.$ = { "atributo": [$$[$0].atributo], "nodoCST": raizA };
                    break;
                case 24:
                    //this.$ = new Atributo(String($$[$0-2]).replace(/\s/g,''), $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
                    let raiz2 = new nodoCST('ATRIBUTO' + conta++, 'ATRIBUTO'); // inicializamos raiz de ATRIBUTO
                    raiz2.hijos.push(new nodoCST('Tag_ID' + conta++, $$[$0 - 2]));
                    raiz2.hijos.push(new nodoCST('Equal' + conta++, '='));
                    raiz2.hijos.push(new nodoCST('Tag_ID' + conta++, String($$[$0]).replace(/"/g, '')));
                    this.$ = {
                        "atributo": new Atributo(String($$[$0 - 2]).replace(/\s/g, ''), String($$[$0]).replace(/"/g, ''), _$[$0 - 2].first_line, _$[$0 - 2].first_column),
                        "nodoCST": raiz2
                    };
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 6: 3, 8: [1, 4] }, { 1: [3] }, { 5: [1, 5] }, { 7: 6, 8: [1, 7] }, { 9: [1, 8] }, { 1: [2, 1] }, { 5: [2, 2] }, { 10: $V0 }, { 10: [1, 10] }, o($V1, [2, 21], { 14: 11, 24: 12, 25: 13, 10: $V2 }), { 10: [1, 15] }, { 13: [1, 16], 16: [1, 17] }, o($V1, [2, 20], { 25: 18, 10: $V2 }), o($V3, [2, 23]), { 11: [1, 19] }, { 11: [1, 20] }, { 7: 23, 8: [1, 22], 10: [1, 25], 15: 21, 17: [1, 24], 18: 26, 19: $V4, 20: $V5, 21: $V6, 22: $V7, 23: $V8 }, { 13: [1, 32] }, o($V3, [2, 22]), { 12: [1, 33] }, { 12: [1, 34] }, { 7: 36, 8: [1, 35], 10: [1, 39], 17: [1, 37], 18: 38, 19: $V4, 20: $V5, 21: $V6, 22: $V7, 23: $V8 }, { 10: $V0, 16: [1, 40] }, o($V9, [2, 11]), o($V9, [2, 12]), o($V9, [2, 13]), o($V9, [2, 14]), o($V9, [2, 15]), o($V9, [2, 16]), o($V9, [2, 17]), o($V9, [2, 18]), o($V9, [2, 19]), o($Va, [2, 6]), o($V3, [2, 24]), { 10: [1, 41] }, { 10: $V0, 16: [1, 42] }, o($V9, [2, 7]), o($V9, [2, 8]), o($V9, [2, 9]), o($V9, [2, 10]), { 10: [1, 43] }, { 11: [1, 44] }, { 10: [1, 45] }, { 13: [1, 46] }, { 12: [1, 47] }, { 13: [1, 48] }, o($Va, [2, 5]), { 9: [1, 49] }, o($Va, [2, 4]), { 13: [1, 50] }, { 8: [2, 3] }],
        defaultActions: { 5: [2, 1], 6: [2, 2], 50: [2, 3] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    const { Elemento } = require("../../CLASES/Elemento");
    const { Atributo } = require("../../CLASES/Atributo");
    const { nodoCST } = require("../../CLASES/nodoCST");
    var conta = 0; // Unica forma de que la etiquetas sean unicas.
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0: /* Ignorar comentarios */
                        break;
                    case 1:
                        return 10;
                        break;
                    case 2:
                        return 19;
                        break;
                    case 3:
                        return 20;
                        break;
                    case 4:
                        return 21;
                        break;
                    case 5:
                        return 22;
                        break;
                    case 6:
                        return 23;
                        break;
                    case 7:
                        return 16;
                        break;
                    case 8:
                        return 9;
                        break;
                    case 9:
                        return 13;
                        break;
                    case 10:
                        return 8;
                        break;
                    case 11:
                        return 'QM';
                        break;
                    case 12:
                        return 11;
                        break;
                    case 13:
                        return "Alphanumeric";
                        break;
                    case 14:
                        return 'Quote';
                        break;
                    case 15:
                        return 17;
                        break;
                    case 16: /* skip whitespace */
                        break;
                    case 17:
                        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                        break;
                    case 18:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:(<!--[\s\S\n]*?-->))/i, /^(?:(([(a-z)|(A-Z)]+)([0-9]|(-|_)*|([(a-z)|(A-Z)]+))*([\n\r\t ])*))/i, /^(?:&lt;)/i, /^(?:&gt;)/i, /^(?:&amp;)/i, /^(?:&apos;)/i, /^(?:&quot;)/i, /^(?:\/)/i, /^(?:\?)/i, /^(?:>)/i, /^(?:<)/i, /^(?:>)/i, /^(?:=)/i, /^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i, /^(?:")/i, /^(?:([^ \n][^<&]+))/i, /^(?:\s+)/i, /^(?:.)/i, /^(?:$)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = Gramatica1;
    exports.Parser = Gramatica1.Parser;
    exports.parse = function () { return Gramatica1.parse.apply(Gramatica1, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && require.main === module) {
        exports.main(process.argv.slice(1));
    }
}

}).call(this)}).call(this,require('_process'))
},{"../../CLASES/Atributo":2,"../../CLASES/Elemento":3,"../../CLASES/nodoCST":7,"_process":13,"fs":11,"path":12}],9:[function(require,module,exports){
(function (process){(function (){
"use strict";
/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gdesc = (function () {
    var o = function (k, v, o, l) { for (o = o || {}, l = k.length; l--; o[k[l]] = v)
        ; return o; }, $V0 = [1, 7], $V1 = [13, 17], $V2 = [1, 14], $V3 = [2, 25], $V4 = [1, 28], $V5 = [1, 29], $V6 = [1, 30], $V7 = [1, 31], $V8 = [1, 32], $V9 = [1, 42], $Va = [2, 15], $Vb = [1, 40], $Vc = [8, 10, 16, 18, 21, 22, 23, 24, 25], $Vd = [5, 8, 10, 16, 18, 21, 22, 23, 24, 25];
    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "START": 3, "TAGS": 4, "EOF": 5, "PROLOG": 6, "TAG": 7, "LT": 8, "qm": 9, "Tag_ID": 10, "Equal": 11, "Alphanumeric": 12, "GT": 13, "L_ATRIBUTOS": 14, "ELEMENTOS": 15, "endTag": 16, "F_Slash": 17, "strings": 18, "ELEMENTOS_PRIMA": 19, "PREDEFINIDOS": 20, "lthan": 21, "gthan": 22, "amp": 23, "apos": 24, "quot": 25, "ATRIBUTOS": 26, "ATRIBUTO": 27, "ATRIBUTOS_PRIMA": 28, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 8: "LT", 9: "qm", 10: "Tag_ID", 11: "Equal", 12: "Alphanumeric", 13: "GT", 16: "endTag", 17: "F_Slash", 18: "strings", 21: "lthan", 22: "gthan", 23: "amp", 24: "apos", 25: "quot" },
        productions_: [0, [3, 2], [4, 2], [6, 11], [7, 8], [7, 7], [7, 5], [15, 2], [15, 2], [15, 2], [15, 2], [19, 2], [19, 2], [19, 2], [19, 2], [19, 0], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [14, 1], [14, 0], [26, 2], [28, 2], [28, 0], [27, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */
            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    this.$ = $$[$0 - 1]; /*console.log($$[$0-1], $$[$0]);*/
                    return this.$;
                    break;
                case 2:
                    this.$ = { "elemento": $$[$0], "errores": arregloErrores };
                    //this.$ = $$[$0]; /*console.log($$[$0]);*/
                    break;
                case 3:
                    if (String($$[$0 - 7]).replace(/\s/g, '') == 'version')
                        if (String($$[$0 - 4]).replace(/\s/g, '') == 'encoding')
                            this.$ = $$[$0 - 2]; // retornamos el encodigo que requiere
                        else
                            this.$ = null;
                    else
                        this.$ = null;
                    break;
                case 4:
                    this.$ = new Elemento(String($$[$0 - 6]).replace(/\s/g, ''), $$[$0 - 3].texto, _$[$0 - 7].first_line, _$[$0 - 7].first_column, $$[$0 - 5], $$[$0 - 3].hijos); /*console.log('Tag->',$$[$0-6],'\n',$$[$0-3].hijos,'\n <-cerrar');*/
                    break;
                case 5:
                    this.$ = new Elemento(String($$[$0 - 5]).replace(/\s/g, ''), $$[$0 - 2].texto, _$[$0 - 6].first_line, _$[$0 - 6].first_column, $$[$0 - 4], []);
                    break;
                case 6:
                    this.$ = new Elemento(String($$[$0 - 3]).replace(/\s/g, ''), $$[$0].texto, _$[$0 - 4].first_line, _$[$0 - 4].first_column, $$[$0 - 2], []);
                    break;
                case 7:
                case 9:
                case 11:
                case 13:
                    $$[$0].texto += String($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 8:
                case 12:
                    $$[$0].texto += $$[$0 - 1];
                    this.$ = $$[$0];
                    break;
                case 10:
                case 14:
                    $$[$0].hijos.unshift($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 15:
                    this.$ = { texto: '', hijos: [] };
                    break;
                case 16:
                    this.$ = String('<');
                    break;
                case 17:
                    this.$ = String('>');
                    break;
                case 18:
                    this.$ = String('&');
                    break;
                case 19:
                    this.$ = String("'");
                    break;
                case 20:
                    this.$ = String('"');
                    break;
                case 21:
                    this.$ = $$[$0];
                    break;
                case 22:
                    this.$ = [];
                    break;
                case 23:
                    $$[$0].unshift($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 24:
                    $$[$0].unshift($$[$0 - 1]);
                    this.$ = $$[$0];
                    break;
                case 25:
                    this.$ = [];
                    break;
                case 26:
                    this.$ = new Atributo(String($$[$0 - 2]).replace(/\s/g, ''), String($$[$0]).replace(/"/g, ''), _$[$0 - 2].first_line, _$[$0 - 2].first_column);
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 6: 3, 8: [1, 4] }, { 1: [3] }, { 5: [1, 5] }, { 7: 6, 8: $V0 }, { 9: [1, 8] }, { 1: [2, 1] }, { 5: [2, 2] }, { 10: [1, 9] }, { 10: [1, 10] }, o($V1, [2, 22], { 14: 11, 26: 12, 27: 13, 10: $V2 }), { 10: [1, 15] }, { 13: [1, 16], 17: [1, 17] }, o($V1, [2, 21]), o($V1, $V3, { 28: 18, 27: 19, 10: $V2 }), { 11: [1, 20] }, { 11: [1, 21] }, { 7: 27, 8: $V0, 10: [1, 26], 15: 22, 16: [1, 23], 18: [1, 24], 20: 25, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 13: [1, 33] }, o($V1, [2, 23]), o($V1, $V3, { 27: 19, 28: 34, 10: $V2 }), { 12: [1, 35] }, { 12: [1, 36] }, { 16: [1, 37] }, { 10: [1, 38] }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 39, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 44, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 45, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 46, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, o($Vc, [2, 16]), o($Vc, [2, 17]), o($Vc, [2, 18]), o($Vc, [2, 19]), o($Vc, [2, 20]), o($Vd, [2, 6]), o($V1, [2, 24]), o([10, 13, 17], [2, 26]), { 10: [1, 47] }, { 10: [1, 48] }, { 13: [1, 49] }, { 16: [2, 7] }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 50, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 51, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 52, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 7: 43, 8: $V0, 10: $V9, 16: $Va, 18: $Vb, 19: 53, 20: 41, 21: $V4, 22: $V5, 23: $V6, 24: $V7, 25: $V8 }, { 16: [2, 8] }, { 16: [2, 9] }, { 16: [2, 10] }, { 11: [1, 54] }, { 13: [1, 55] }, o($Vd, [2, 5]), { 16: [2, 11] }, { 16: [2, 12] }, { 16: [2, 13] }, { 16: [2, 14] }, { 12: [1, 56] }, o($Vd, [2, 4]), { 9: [1, 57] }, { 13: [1, 58] }, { 8: [2, 3] }],
        defaultActions: { 5: [2, 1], 6: [2, 2], 39: [2, 7], 44: [2, 8], 45: [2, 9], 46: [2, 10], 50: [2, 11], 51: [2, 12], 52: [2, 13], 53: [2, 14], 58: [2, 3] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            }
            else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            }
            else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                }
                else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    }
                    else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        }
                        else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [
                                lstack[lstack.length - (len || 1)].range[0],
                                lstack[lstack.length - 1].range[1]
                            ];
                        }
                        r = this.performAction.apply(yyval, [
                            yytext,
                            yyleng,
                            yylineno,
                            sharedState.yy,
                            action[1],
                            vstack,
                            lstack
                        ].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    const { Elemento } = require("../../CLASES/Elemento");
    const { Atributo } = require("../../CLASES/Atributo");
    const { nodoCST } = require("../../CLASES/nodoCST");
    const { Errores } = require("../../CLASES/Errores");
    let conta = 0;
    let arregloErrores = []; // clase? o un objeto...
    /* generated by jison-lex 0.3.4 */
    var lexer = (function () {
        var lexer = ({
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                }
                else {
                    throw new Error(str);
                }
            },
            // resets the lexer, sets new input
            setInput: function (input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },
            // consumes and returns one char from the input
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                }
                else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }
                this._input = this._input.slice(1);
                return ch;
            },
            // unshifts one char (or a string) into the input
            unput: function (ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);
                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);
                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;
                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ?
                        (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                            + oldLines[oldLines.length - lines.length].length - lines[0].length :
                        this.yylloc.first_column - len
                };
                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },
            // When called from action, caches matched text and appends it on next action
            more: function () {
                this._more = true;
                return this;
            },
            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function () {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },
            // retain first n characters of the match
            less: function (n) {
                this.unput(this.match.slice(n));
            },
            // displays already matched input, i.e. for error messages
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            // displays upcoming input, i.e. for error messages
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function (match, indexed_rule) {
                var token, lines, backup;
                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }
                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ?
                        lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                        this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                }
                else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },
            // return next match in input
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }
                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            }
                            else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            }
                            else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        }
                        else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                }
                else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                }
                else {
                    return this.lex();
                }
            },
            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                }
                else {
                    return this.conditionStack[0];
                }
            },
            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                }
                else {
                    return this.conditions["INITIAL"].rules;
                }
            },
            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                }
                else {
                    return "INITIAL";
                }
            },
            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },
            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0: /* Ignorar comentarios */
                        break;
                    case 1:
                        return 10;
                        break;
                    case 2:
                        return 21;
                        break;
                    case 3:
                        return 22;
                        break;
                    case 4:
                        return 23;
                        break;
                    case 5:
                        return 24;
                        break;
                    case 6:
                        return 25;
                        break;
                    case 7:
                        return 16;
                        break;
                    case 8:
                        return 17;
                        break;
                    case 9:
                        return 9;
                        break;
                    case 10:
                        return 13;
                        break;
                    case 11:
                        return 8;
                        break;
                    case 12:
                        return 'QM';
                        break;
                    case 13:
                        return 11;
                        break;
                    case 14:
                        return "Alphanumeric";
                        break;
                    case 15:
                        return 'Quote';
                        break;
                    case 16:
                        return 18;
                        break;
                    case 17: /* skip whitespace */
                        break;
                    case 18:
                        console.error('ERROOOOOR léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                        arregloErrores.push(new Errores(yy_.yytext, 'LEXICO', yy_.yylloc.first_line, yy_.yylloc.first_column)); //Almacenamos los errores lexicos.
                        // Se recupera de cualquier error lexico (lexema | token no reconocido por el parser)
                        break;
                    case 19:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:(<!--[\s\S\n]*?-->))/i, /^(?:(([(a-z)|(A-Z)]+)([0-9]|(-|_)*|([(a-z)|(A-Z)]+))*([\n\r\t ])*))/i, /^(?:&lt;)/i, /^(?:&gt;)/i, /^(?:&amp;)/i, /^(?:&apos;)/i, /^(?:&quot;)/i, /^(?:<\/)/i, /^(?:\/)/i, /^(?:\?)/i, /^(?:>)/i, /^(?:<)/i, /^(?:>)/i, /^(?:=)/i, /^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i, /^(?:")/i, /^(?:([^ \n][^<&]+))/i, /^(?:\s+)/i, /^(?:.)/i, /^(?:$)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], "inclusive": true } }
        });
        return lexer;
    })();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;
    return new Parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = gdesc;
    exports.Parser = gdesc.Parser;
    exports.parse = function () { return gdesc.parse.apply(gdesc, arguments); };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && require.main === module) {
        exports.main(process.argv.slice(1));
    }
}

}).call(this)}).call(this,require('_process'))
},{"../../CLASES/Atributo":2,"../../CLASES/Elemento":3,"../../CLASES/Errores":4,"../../CLASES/nodoCST":7,"_process":13,"fs":11,"path":12}],10:[function(require,module,exports){
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

},{"./GRAMATICAS/Gramatica1":8,"./GRAMATICAS/gdesc":9}],11:[function(require,module,exports){

},{}],12:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":13}],13:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[10]);