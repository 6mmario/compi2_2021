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
                    this.$ = $$[$0 - 1]; /*console.log($$[$0-1], $$[$0]);*/
                    return this.$;
                    break;
                case 2:
                    this.$ = $$[$0]; /*console.log($$[$0]);*/
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
                    this.$ = new Elemento(String($$[$0 - 7]).replace(/\s/g, ''), $$[$0 - 4].texto, _$[$0 - 8].first_line, _$[$0 - 8].first_column, $$[$0 - 6], $$[$0 - 4].hijos); /*console.log('Tag->',$$[$0-7],'\n',$$[$0-4].hijos,'\n <-cerrar');*/
                    break;
                case 5:
                    this.$ = new Elemento(String($$[$0 - 6]).replace(/\s/g, ''), $$[$0 - 3].texto, _$[$0 - 7].first_line, _$[$0 - 7].first_column, $$[$0 - 5], []);
                    break;
                case 6:
                    this.$ = new Elemento(String($$[$0 - 3]).replace(/\s/g, ''), $$[$0].texto, _$[$0 - 4].first_line, _$[$0 - 4].first_column, $$[$0 - 2], []);
                    break;
                case 7:
                    $$[$0 - 1].hijos.push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 8:
                    $$[$0 - 1].texto += $$[$0];
                    this.$ = $$[$0 - 1]; /* console.log('ELEMENTOS strings ->',$$[$0-1], $$[$0], '--> ', $$[$0-1]);*/
                    break;
                case 9:
                    $$[$0 - 1].texto += $$[$0];
                    this.$ = $$[$0 - 1];
                    break;
                case 10:
                    $$[$0 - 1].texto += ('' + $$[$0]);
                    this.$ = $$[$0 - 1]; /*console.log('ELEMENTOS Tag_ID ->',$$[$0-1], $$[$0], '--> ', $$[$0-1]);*/
                    break;
                case 11:
                    this.$ = { texto: '', hijos: [$$[$0]] };
                    break;
                case 12:
                    this.$ = { texto: String($$[$0]), hijos: [] }; /* console.log('strings ->', $$[$0],'END');*/
                    break;
                case 13:
                    this.$ = { texto: String($$[$0]), hijos: [] }; /*console.log('Tag_ID ->', $$[$0]);*/
                    break;
                case 14:
                    this.$ = { texto: $$[$0], hijos: [] };
                    break;
                case 15:
                    this.$ = String('<');
                    break;
                case 16:
                    this.$ = String('>');
                    break;
                case 17:
                    this.$ = String('&');
                    break;
                case 18:
                    this.$ = String("'");
                    break;
                case 19:
                    this.$ = String('"');
                    break;
                case 20:
                    this.$ = $$[$0]; /*console.log($$[$0]);*/
                    break;
                case 21:
                    this.$ = [];
                    break;
                case 22:
                    $$[$0 - 1].push($$[$0]);
                    this.$ = $$[$0 - 1];
                    break;
                case 23:
                    this.$ = [$$[$0]];
                    break;
                case 24:
                    this.$ = new Atributo(String($$[$0 - 2]).replace(/\s/g, ''), $$[$0], _$[$0 - 2].first_line, _$[$0 - 2].first_column);
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
                    case 0:
                        return 10;
                        break;
                    case 1:
                        return 19;
                        break;
                    case 2:
                        return 20;
                        break;
                    case 3:
                        return 21;
                        break;
                    case 4:
                        return 22;
                        break;
                    case 5:
                        return 23;
                        break;
                    case 6:
                        return 16;
                        break;
                    case 7:
                        return 9;
                        break;
                    case 8:
                        return 13;
                        break;
                    case 9:
                        return 8;
                        break;
                    case 10:
                        return 'QM';
                        break;
                    case 11:
                        return 11;
                        break;
                    case 12:
                        return "Alphanumeric";
                        break;
                    case 13:
                        return 'Quote';
                        break;
                    case 14:
                        return 17;
                        break;
                    case 15: /* skip whitespace */
                        break;
                    case 16:
                        console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
                        break;
                    case 17:
                        return 5;
                        break;
                }
            },
            rules: [/^(?:(([(a-z)|(A-Z)]+)([0-9]|(-|_)*|([(a-z)|(A-Z)]+))*([\n\r\t ])*))/i, /^(?:&lt;)/i, /^(?:&gt;)/i, /^(?:&amp;)/i, /^(?:&apos;)/i, /^(?:&quot;)/i, /^(?:\/)/i, /^(?:\?)/i, /^(?:>)/i, /^(?:<)/i, /^(?:>)/i, /^(?:=)/i, /^(?:("((\\([\'\"\\bfnrtv]))|([^\"\\]+))*"))/i, /^(?:")/i, /^(?:([^ \n][^<&]+))/i, /^(?:\s+)/i, /^(?:.)/i, /^(?:$)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], "inclusive": true } }
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
