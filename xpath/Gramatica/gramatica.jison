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


\s+                                 /* skip whitespace */

"print"                     return 'PRINT';
"null"                      return 'NULL';
"true"                      return 'TRUE';
"false"                     return 'FALSE';

"+"                         return 'PLUS';
"-"                         return 'MINUS';
"*"                         return 'TIMES';
"//"                        return 'DSLASH';
"/"                         return 'SLASH';
"div"                       return 'DIV';
".."                        return 'DDOT';
"."                         return 'DOT';
"@"                         return 'AT';
"mod"                       return 'MOD';

"<="                        return 'LTE';
">="                        return 'GTE';
"<"                         return 'LT';
">"                         return 'GT';
"="                         return 'ASIG';
"=="                        return 'EQUAL';
"!="                        return 'NEQUAL';

"and"                       return 'AND';
"|"                         return 'SOR';
"or"                        return 'OR';
"not"                       return 'NOT';

","                         return 'COMA';
";"                         return 'SEMICOLON';
"::"                        return 'AXE'
"("                         return 'LPAREN';
")"                         return 'RPAREN';
"["                         return 'LCOR';
"]"                         return 'RCOR';


/* Number literals */
(([0-9]+"."[0-9]*)|("."[0-9]+))     return 'DOUBLELITERAL';
[0-9]+                              return 'INTEGERLITERAL';

[A-ZA-Z_][A-ZA-Z0-9_\-Ñ]*            return 'IDENTIFIER';

{STRINGLITERAL}                     return 'STRINGLITERAL';
{CHARLITERAL}                       return 'CHARLITERAL';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }

<<EOF>>                     return 'EOF'

/lex

%{

%}

%left 'DSLASH', 'SLASH'
%left 'AXE'
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

S               : consultas EOF { $$ = $1; return $$; }
                ;

consultas       : consultas SOR expresion 
                | expresion  { $$ = $1; }
                ;    

expresion       : DSLASH expresion %prec DSLASH
                | SLASH expresion  %prec SLASH  
                | expresion DSLASH expresion
                | expresion SLASH expresion
                | expresion AXE expresion
                | expresion AND expresion                          
                | expresion OR expresion                         
                | NOT expresion %prec NOT     
                | expresion ASIG expresion
                | expresion NEQUAL expresion                              
                | expresion GT expresion                      
                | expresion GTE expresion                   
                | expresion LT expresion                     
                | expresion LTE expresion                 
                | expresion MOD expresion           { $$ = new Operacion($1,$3,Operador.MOD, @1.first_line, @1.first_column); }                           
                | expresion DIV expresion           { $$ = new Operacion($1,$3,Operador.DIVISION, @1.first_line, @1.first_column); }                           
                | expresion TIMES expresion         { $$ = new Operacion($1,$3,Operador.MULTIPLICACION, @1.first_line, @1.first_column); }                      
                | expresion PLUS expresion          { $$ = new Operacion($1,$3,Operador.SUMA, @1.first_line, @1.first_column); }        
                | expresion MINUS expresion         { $$ = new Operacion($1,$3,Operador.RESTA, @1.first_line, @1.first_column); }
                | LPAREN expresion RPAREN           { $$ = $2 }                   
                | MINUS expresion %prec UMINUS      { $$ = new Operacion($2,$2,Operador.MENOS_UNARIO, @1.first_line, @1.first_column); }
                | expresion TIMES        
                | TIMES                       
                | DOUBLELITERAL                                        
                | INTEGERLITERAL                                        
                | STRINGLITERAL     
                | CHARLITERAL        
                | nodo                              { $$ = $1 }       
                | DOT nodo
                | DDOT nodo   
                | DOT
                | DDOT                       
                ;

nodo            : AT TIMES
                | AT predicado
                | predicado                         { $$ = $1 }                      
                ;

predicado       : IDENTIFIER cors
                | IDENTIFIER func
                | IDENTIFIER { $$ = new Operacion($1,$1,Operador.NODO,@1.first_line,@1.first_column); }
                ;

func            : LPAREN args PAREN
                | LPAREN RPAREN
                ;               

args            : args COMA expresion
                | expresion
                ;                 

cors            : cors LCOR expresion RCOR                
                | LCOR expresion RCOR
                ;