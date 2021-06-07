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
".."                        return 'DDOT';
"."                         return 'DOT';
"@"                         return 'AT';
"%"                         return 'MOD';

"<="                        return 'LTE';
">="                        return 'GTE';
"<"                         return 'LT';
">"                         return 'GT';
"="                         return 'ASIG';
"=="                        return 'EQUAL';
"!="                        return 'NEQUAL';

"and"                        return 'AND';
"|"                         return 'SOR';
"or"                        return 'OR';
"not"                         return 'NOT';

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

S               : consultas EOF
                ;

consultas       : consultas SOR root
                | root
                ;

root            : DIV DIV nodos  
                | DIV nodos
                | nodos       
                ;

nodos           : expresion DIV DIV nodos
                | expresion DIV nodos          
                | expresion
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
                | expresion PLUS expresion          
                | expresion MINUS expresion                        
                | MINUS expresion %prec UMINUS               
                | LPAREN expresion RPAREN                     
                | DOUBLELITERAL                                        
                | INTEGERLITERAL                                        
                | STRINGLITERAL     
                | CHARLITERAL        
                | nodo 
                | DOT nodo
                | DDOT nodo   
                | DOT
                | DDOT    
                | TIMES                     
                ;

nodo            : AT predicado
                | predicado
                ;

predicado       : IDENTIFIER cors
                | IDENTIFIER
                ;

cors            : cors LCOR root RCOR                
                | LCOR root RCOR
                ;