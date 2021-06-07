/* Definición Léxica */
%lex

%options case-insensitive

ESCAPECHAR                          [\'\"\\bfnrtv]
ESCAPE                              \\{ESCAPECHAR}
ACCEPTEDCHARSDOUBLE                 [^\"\\]+
STRINGDOUBLE                        {ESCAPE}|{ACCEPTEDCHARSDOUBLE}
STRINGLITERAL                       \"{STRINGDOUBLE}*\"

ACCEPTEDCHARSSINGLE                 [^\'\\]
STRINGSINGLE                        {ESCAPE}|{ACCEPTEDCHARSSINGLE}
CHARLITERAL                         \'{STRINGSINGLE}\'

BSL                                 "\\".
%s                                  comment
%%


"/*"                                this.begin('comment');
<comment>"*/"                       this.popState();
<comment>.                          /* skip comment content*/
\s+                                 /* skip whitespace */

"print"                     return 'PRINT';
"null"                      return 'NULL';
"true"                      return 'TRUE';
"false"                     return 'FALSE';

"+"                         return 'PLUS';
"-"                         return 'MINUS';
"*"                         return 'TIMES';
"/"                         return 'DIV';
"."                         return 'DOT';
".."                        return 'DDOT';
"@"                         return 'AT';
"%"                         return 'MOD';

"<="                        return 'LTE';
">="                        return 'GTE';
"<"                         return 'LT';
">"                         return 'GT';
"="                         return 'ASIG';
"=="                        return 'EQUAL';
"!="                        return 'NEQUAL';

"&&"                        return 'AND';
"|"                         return 'SOR';
"||"                        return 'OR';
"!"                         return 'NOT';

","                         return 'COMA';
";"                         return 'SEMICOLON';
"("                         return 'LPAREN';
")"                         return 'RPAREN';
"["                         return 'LCOR';
"]"                         return 'RCOR';


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DOUBLELITERAL';
[0-9]+                              return 'INTEGERLITERAL';

[A-ZA-Z_][A-ZA-Z0-9_ÑÑ]*            return 'IDENTIFIER';

{STRINGLITERAL}                     return 'STRINGLITERAL'
{CHARLITERAL}                       return 'CHARLITERAL'

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

//SECCION DE IMPORTS
%{

%}

// DEFINIMOS PRESEDENCIA DE OPERADORES
%left 'OR'
%left 'AND'
%left 'EQUAL' 'ASIG' 'NEQUAL'
%nonassoc 'LT' 'GT' 'LTE' 'GTE'
%left 'PLUS' 'MINUS' 'TIMES' 'MOD'
%left 'MUL' 'DIV'
%left UMINUS 'NOT'
%left 'LCOR' 'RCOR'

%start S

%%

S               : sentencias EOF
                ;

sentencias      : sentencias SOR root
                | root
                ;

root            : nodos
                | DIV nodos
                | DIV DIV nodos
                ;

nodos           : nodo DIV nodos
                | nodo DIV DIV nodos
                | nodo
                ;

nodo            : DOT predicado
                | DDOT predicado
                | AT predicado
                | predicado
                ;

predicado       : IDENTIFIER LCOR expresion RCOR
                | IDENTIFIER
                ;

expresion       : expresion AND expresion                          
                | expresion OR expresion                         
                | NOT expresion %prec NOT                       
                | expresion ASIG expresion                    
                | expresion NEQUAL expresion               
                | expresion GT expresion                      
                | expresion GTE expresion                   
                | expresion LT expresion                     
                | expresion LTE expresion                 
                | expresion MOD expresion                                           
                | expresion TIMES expresion                   
                | expresion DIV expresion               
                | expresion PLUS expresion          
                | expresion MINUS expresion                        
                | MINUS expresion %prec UMINUS               
                | LPAREN expresion RPAREN        
                | AT IDENTIFIER                
                | DOUBLELITERAL                                        
                | INTEGERLITERAL                                        
                | STRINGLITERAL     
                | CHARLITERAL                                     
                | IDENTIFIER                                            
                ;