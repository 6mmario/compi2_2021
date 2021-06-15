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
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,4],$V1=[1,5],$V2=[1,7],$V3=[1,10],$V4=[1,9],$V5=[1,8],$V6=[1,11],$V7=[1,12],$V8=[1,13],$V9=[1,14],$Va=[1,16],$Vb=[1,17],$Vc=[1,18],$Vd=[1,20],$Ve=[5,6],$Vf=[1,27],$Vg=[1,28],$Vh=[1,29],$Vi=[1,30],$Vj=[1,31],$Vk=[1,32],$Vl=[1,33],$Vm=[1,34],$Vn=[1,35],$Vo=[1,36],$Vp=[1,37],$Vq=[1,38],$Vr=[1,39],$Vs=[1,40],$Vt=[5,6,8,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25,27,41,42,44],$Vu=[5,6,8,10,11,12,13,15,16,27,41,42,44],$Vv=[5,6,8,10,11,12,13,15,16,17,18,19,20,21,23,24,25,27,41,42,44],$Vw=[41,42],$Vx=[5,6,8,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25,27,41,42,43,44];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"S":3,"consultas":4,"EOF":5,"SOR":6,"nodos":7,"DSLASH":8,"expresion":9,"SLASH":10,"AXE":11,"AND":12,"OR":13,"NOT":14,"ASIG":15,"NEQUAL":16,"GT":17,"GTE":18,"LT":19,"LTE":20,"MOD":21,"DIV":22,"TIMES":23,"PLUS":24,"MINUS":25,"LPAREN":26,"RPAREN":27,"DOUBLELITERAL":28,"INTEGERLITERAL":29,"STRINGLITERAL":30,"CHARLITERAL":31,"nodo":32,"DOT":33,"DDOT":34,"AT":35,"predicado":36,"IDENTIFIER":37,"cors":38,"func":39,"args":40,"PAREN":41,"COMA":42,"LCOR":43,"RCOR":44,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",6:"SOR",8:"DSLASH",10:"SLASH",11:"AXE",12:"AND",13:"OR",14:"NOT",15:"ASIG",16:"NEQUAL",17:"GT",18:"GTE",19:"LT",20:"LTE",21:"MOD",22:"DIV",23:"TIMES",24:"PLUS",25:"MINUS",26:"LPAREN",27:"RPAREN",28:"DOUBLELITERAL",29:"INTEGERLITERAL",30:"STRINGLITERAL",31:"CHARLITERAL",33:"DOT",34:"DDOT",35:"AT",37:"IDENTIFIER",41:"PAREN",42:"COMA",43:"LCOR",44:"RCOR"},
productions_: [0,[3,2],[4,3],[4,1],[7,2],[7,2],[7,3],[7,3],[7,1],[9,3],[9,3],[9,3],[9,2],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,3],[9,2],[9,2],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[32,2],[32,2],[32,1],[36,2],[36,2],[36,1],[39,3],[39,2],[40,3],[40,1],[38,4],[38,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 this.$ = $$[$0-1]; return this.$; 
break;
case 3:
 this.$ = $$[$0]; 
break;
case 19:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MOD, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 20:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.DIVISION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 21:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.MULTIPLICACION, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 22:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.SUMA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 23:
 this.$ = new Operacion($$[$0-2],$$[$0],Operador.RESTA, _$[$0-2].first_line, _$[$0-2].first_column); 
break;
case 24:
 this.$ = $$[$0-1] 
break;
case 25:
 this.$ = new Operacion($$[$0],$$[$0],Operador.MENOS_UNARIO, _$[$0-1].first_line, _$[$0-1].first_column); 
break;
case 32: case 39:
 this.$ = $$[$0] 
break;
case 42:
 this.$ = new Operacion($$[$0],$$[$0],Operador.NODO,_$[$0].first_line,_$[$0].first_column); 
break;
}
},
table: [{3:1,4:2,7:3,8:$V0,9:6,10:$V1,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{1:[3]},{5:[1,21],6:[1,22]},o($Ve,[2,3]),{9:23,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:24,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},o($Ve,[2,8],{8:[1,25],10:[1,26],11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),{9:41,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:42,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:43,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},o($Vt,[2,27]),o($Vt,[2,28]),o($Vt,[2,29]),o($Vt,[2,30]),o($Vt,[2,31]),o($Vt,[2,32]),o($Vt,[2,35],{36:19,32:44,35:$Vc,37:$Vd}),o($Vt,[2,36],{36:19,32:45,35:$Vc,37:$Vd}),{23:[1,46],36:47,37:$Vd},o($Vt,[2,39]),o($Vt,[2,42],{38:48,39:49,26:[1,51],43:[1,50]}),{1:[2,1]},{7:52,8:$V0,9:6,10:$V1,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},o($Ve,[2,4],{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Ve,[2,5],{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),{9:53,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:54,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:55,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:56,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:57,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:58,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:59,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:60,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:61,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:62,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:63,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:64,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:65,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},o($Vt,[2,26],{32:15,36:19,9:66,14:$V2,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,33:$Va,34:$Vb,35:$Vc,37:$Vd}),{9:67,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:68,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},o($Vt,[2,12]),{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs,27:[1,69]},o($Vt,[2,25]),o($Vt,[2,33]),o($Vt,[2,34]),o($Vt,[2,37]),o($Vt,[2,38]),o($Vt,[2,40],{43:[1,70]}),o($Vt,[2,41]),{9:71,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{9:74,14:$V2,23:$V3,25:$V4,26:$V5,27:[1,73],28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd,40:72},o($Ve,[2,2]),o($Ve,[2,6],{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Ve,[2,7],{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o([5,6,8,10,11,27,41,42,44],[2,9],{12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o([5,6,8,10,11,12,13,27,41,42,44],[2,10],{15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o([5,6,8,10,11,13,27,41,42,44],[2,11],{12:$Vg,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Vu,[2,13],{17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Vu,[2,14],{17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Vu,[2,15],{21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Vu,[2,16],{21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Vu,[2,17],{21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Vu,[2,18],{21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),o($Vv,[2,19],{22:$Vp}),o($Vt,[2,20]),o($Vv,[2,21],{22:$Vp}),o($Vv,[2,22],{22:$Vp}),o($Vv,[2,23],{22:$Vp}),o($Vt,[2,24]),{9:75,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs,44:[1,76]},{41:[1,77],42:[1,78]},o($Vt,[2,44]),o($Vw,[2,46],{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs}),{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs,44:[1,79]},o($Vx,[2,48]),o($Vt,[2,43]),{9:80,14:$V2,23:$V3,25:$V4,26:$V5,28:$V6,29:$V7,30:$V8,31:$V9,32:15,33:$Va,34:$Vb,35:$Vc,36:19,37:$Vd},o($Vx,[2,47]),o($Vw,[2,45],{11:$Vf,12:$Vg,13:$Vh,15:$Vi,16:$Vj,17:$Vk,18:$Vl,19:$Vm,20:$Vn,21:$Vo,22:$Vp,23:$Vq,24:$Vr,25:$Vs})],
defaultActions: {21:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
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
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
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
        } else {
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
                } else {
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
            } else {
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
}};


/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
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
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
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
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
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
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

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
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
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
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
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
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* skip whitespace */
break;
case 1:return 'PRINT';
break;
case 2:return 'NULL';
break;
case 3:return 'TRUE';
break;
case 4:return 'FALSE';
break;
case 5:return 24;
break;
case 6:return 25;
break;
case 7:return 23;
break;
case 8:return 8;
break;
case 9:return 10;
break;
case 10:return 22;
break;
case 11:return 34;
break;
case 12:return 33;
break;
case 13:return 35;
break;
case 14:return 21;
break;
case 15:return 20;
break;
case 16:return 18;
break;
case 17:return 19;
break;
case 18:return 17;
break;
case 19:return 15;
break;
case 20:return 'EQUAL';
break;
case 21:return 16;
break;
case 22:return 12;
break;
case 23:return 6;
break;
case 24:return 13;
break;
case 25:return 14;
break;
case 26:return 42;
break;
case 27:return 'SEMICOLON';
break;
case 28:return 11
break;
case 29:return 26;
break;
case 30:return 27;
break;
case 31:return 43;
break;
case 32:return 44;
break;
case 33:return 28;
break;
case 34:return 29;
break;
case 35:return 37;
break;
case 36:return 30;
break;
case 37:return 31;
break;
case 38:
                                        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                                    
break;
case 39:return 5
break;
}
},
rules: [/^(?:\s+)/i,/^(?:print\b)/i,/^(?:null\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/\/)/i,/^(?:\/)/i,/^(?:div\b)/i,/^(?:\.\.)/i,/^(?:\.)/i,/^(?:@)/i,/^(?:mod\b)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:=)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:and\b)/i,/^(?:\|)/i,/^(?:or\b)/i,/^(?:not\b)/i,/^(?:,)/i,/^(?:;)/i,/^(?:::)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:(([0-9]+\.[0-9]*)|(\.[0-9]+)))/i,/^(?:[0-9]+)/i,/^(?:[A-ZA-Z_][A-ZA-Z0-9_\-Ñ]*)/i,/^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i,/^(?:('((\\([\'\"\\bfnrtv]))|([^\'\\]))'))/i,/^(?:.)/i,/^(?:$)/i],
conditions: {"comment":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"inclusive":true},"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}