


%{
%}
%lex
%options case-insensitive 


escapechar                          [\'\"\\bfnrtv]
escape                              \\{escapechar}
acceptedcharsdouble                 [^\"\\]+
stringdouble                        {escape}|{acceptedcharsdouble}
alfanumerico                       \"{stringdouble}*\"
//strings                            {stringdouble}+

integer [0-9]+
double {integer}"."{integer}
letras [(a-z)|(A-Z)]+
keyboard [\n\r\t ]               // Tabulador, espacios, saltos de linea, retornos de carro -> forman parte del identificador para evitar conflictos, sin embargo deben ser eliminados unicamente cuando venga un nombre de un TAG
identificador  {letras}( [0-9]|(\-|\_)*|{letras} )*{keyboard}*
strings   [^ \n][^<&]+
//endtag    [<][\s*][/] // -> "< /"
%%     

//\s+                         /* skip whitespace */
//"print"                     return "print"
//{double}                    return 'Number_Literal'
//{integer}                   return 'Number_Literal'
{identificador}             return 'Tag_ID'
"&lt;"                      return 'lthan'
"&gt;"                      return 'gthan'
"&amp;"                     return 'amp'
"&apos;"                    return 'apos'
"&quot;"                    return 'quot'
"</"                        return 'endTag'
"/"                         return 'F_Slash'
"?"                         return 'qm'
//"("                         return '('
//")"                         return ')'
">"                         return 'GT'
"<"                         return 'LT'
">"                         return 'QM'
"="                         return 'Equal'
{alfanumerico}              return "Alphanumeric"
"\""                        return 'Quote'
{strings}                   return 'strings'

\s+                         /* skip whitespace */

//[a-zA-Z_][a-zA-Z0-9_ñÑ]*    return 'identifier';

//error lexico
.                                   {
                                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
                                    }


<<EOF>>                     return 'EOF';



/lex

//SECCION DE IMPORTS
%{
    const {Elemento} = require("../../CLASES/Elemento");
    const {Atributo} = require("../../CLASES/Atributo");
    const {nodoCST} = require("../../CLASES/nodoCST");
    let conta = 0;
%}

// DEFINIMOS PRESEDENCIA DE OPERADORES


%left LT

%start START

%%  

START: TAGS EOF         { $$ = $1; /*console.log($1, $2);*/ return $$; } //strings PREDEFINIDOS Tag_ID
;
   
TAGS: PROLOG TAG               {$$ = $2; console.log($2);} // objetos tipo TAG ($$ = clase Elemento)
;

PROLOG: LT qm Tag_ID Tag_ID Equal Alphanumeric Tag_ID Equal Alphanumeric qm GT { 

    if(String($4).replace(/\s/g,'') == 'version') 
        if(String($7).replace(/\s/g,'') == 'encoding')
            $$ = $9; // retornamos el encodigo que requiere
        else $$ = null;  
    else $$ = null;
    
    }
;

TAG:  LT Tag_ID L_ATRIBUTOS GT  ELEMENTOS   endTag Tag_ID GT          { $$ =  new Elemento(String($2).replace(/\s/g,''), $5.texto, @1.first_line, @1.first_column, $3.atributo, $5.hijos); /*console.log('Tag->',$2,'\n',$5.hijos,'\n <-cerrar');*/}
    | LT Tag_ID L_ATRIBUTOS GT              endTag Tag_ID GT          {$$ =  new Elemento(String($2).replace(/\s/g,''), $5.texto, @1.first_line, @1.first_column, $3.atributo, []);}
    | LT Tag_ID L_ATRIBUTOS F_Slash GT                                {$$ =  new Elemento(String($2).replace(/\s/g,''), $5.texto, @1.first_line, @1.first_column, $3.atributo, []) ;}
;

//ELEMENTOS: ELEMENTOS TAG                { $1.hijos.push($2); $$ = $1;         }
//        |  ELEMENTOS strings            { $1.texto += $2; $$ = $1;             /* console.log('ELEMENTOS strings ->',$1, $2, '--> ', $1);*/ }
//        |  ELEMENTOS PREDEFINIDOS       { $1.texto += $2; $$ = $1; }
//        //|  ELEMENTOS Alphanumeric       { $1.texto += $2; $$ = $1;              console.log('ELEMENTOS ALPHA ->',$1, $2, '--> ', $1); }
//        |  ELEMENTOS Tag_ID             { $1.texto += ('' + $2); $$ = $1;      /*console.log('ELEMENTOS Tag_ID ->',$1, $2, '--> ', $1);*/ }
//        |  TAG                          { $$ = {texto:'', hijos:[$1]};        } 
//        |  strings                      { $$ = {texto:String($1), hijos:[]}; /* console.log('strings ->', $1,'END');*/}
//        |  Tag_ID                       { $$ = {texto:String($1), hijos:[]};  /*console.log('Tag_ID ->', $1);*/}
//        | PREDEFINIDOS                  { $$ = {texto: $1, hijos:[]}; }
//        //|  Alphanumeric               { $$ = {texto:String($1), hijos:[]};  console.log('Alphanumeric ->', $1);} 
//;



ELEMENTOS:  strings ELEMENTOS_PRIMA                 { $2.texto += String($1); $$ = $2; }
            | PREDEFINIDOS ELEMENTOS_PRIMA          { $2.texto += $1.val;         $$ = $2; }
            | Tag_ID ELEMENTOS_PRIMA                { $2.texto += String($1); $$ = $2; }
            | TAG ELEMENTOS_PRIMA                   { $2.hijos.unshift($1);   $$ = $2; }
;
ELEMENTOS_PRIMA:  strings ELEMENTOS_PRIMA           { $2.texto += String($1); $$ = $2; }
                | PREDEFINIDOS ELEMENTOS_PRIMA      { $2.texto += $1.val;         $$ = $2; }
                | Tag_ID ELEMENTOS_PRIMA            { $2.texto += String($1); $$ = $2; }
                | TAG ELEMENTOS_PRIMA               { $2.hijos.unshift($1);   $$ = $2; }
                | /*EPSILON*/                       { $$ = {texto:'', hijos:[]}; }
;


PREDEFINIDOS: lthan     { var pred = new nodoCST('PREDEFINIDOS'+ conta++,'PREDEFINIDOS'); pred.hijos.push(new nodoCST('lthan'+ conta++,$1)); $$ = {"val":String('<'), "nodoCST":pred}; }
            | gthan     { var pred = new nodoCST('PREDEFINIDOS'+ conta++,'PREDEFINIDOS'); pred.hijos.push(new nodoCST('gthan'+ conta++,$1)); $$ = {"val":String('>'), "nodoCST":pred}; }
            | amp       { var pred = new nodoCST('PREDEFINIDOS'+ conta++,'PREDEFINIDOS'); pred.hijos.push(new nodoCST('amp'+ conta++,$1));   $$ = {"val":String('&'), "nodoCST":pred}; }
            | apos      { var pred = new nodoCST('PREDEFINIDOS'+ conta++,'PREDEFINIDOS'); pred.hijos.push(new nodoCST('apos'+ conta++,$1));  $$ = {"val":String("'"), "nodoCST":pred}; }
            | quot      { $$ = String('"');  }
;

L_ATRIBUTOS: ATRIBUTOS      { 

                var raiz = new nodoCST('L_ATRIBUTOS'+ conta++,'L_ATRIBUTOS'); 
                    raiz.hijos.push($1.nodoCST);//L_ATRIBUTOS -> ATRIBUTOS

                $$ = {  "atributo": $1.atributo, "nodoCST": raiz};
                //$$ = $1.atributo; 
                //console.log('IMPRESION FINAL:\n',$1);
            } 
            | /*EPSILON*/   {

                var raiz = new nodoCST('L_ATRIBUTOS'+ conta++,'L_ATRIBUTOS'); 
                    raiz.hijos.push(new nodoCST('epsilon'+ conta++,'epsilon'));//L_ATRIBUTOS -> EPSILON

                $$ = {  "atributo": [], "nodoCST": raiz};
                //$$ = [];
                
             } // arreglo vacio de atributos
;            

/*
ATRIBUTOS: ATRIBUTOS ATRIBUTO   { $1.push($2); $$ = $1; }
        | ATRIBUTO              { $$ = [$1]; } // Creacion del arreglo de atributos
;
*/ 
// Reescribir removiendo la recursividad 
ATRIBUTOS: ATRIBUTO ATRIBUTOS_PRIMA              {

                var raiz = new nodoCST('ATRIBUTOS'+ conta++,'ATRIBUTOS_PRIMA'); 
                    raiz.hijos.push($1.nodoCST);//ATRIBUTOS -> ATRIBUTO
                    raiz.hijos.push($2.nodoCST);//ATRIBUTOS -> ATRIBUTOS_PRIMA

                $2.atributo.unshift($1.atributo);

                $$ = {  "atributo": $2.atributo, "nodoCST": raiz};
                //$2.unshift($1); 
                //$$ = $2;
            } 
;
ATRIBUTOS_PRIMA : ATRIBUTO ATRIBUTOS_PRIMA       {
                        $2.atributo.unshift($1.atributo);

                        var raiz = new nodoCST('AT_P'+ conta++,'ATRIBUTOS_PRIMA'); 
                            raiz.hijos.push($1.nodoCST);//ATRIBUTOS_PRIMA -> ATRIBUTO
                            raiz.hijos.push($2.nodoCST);//ATRIBUTOS_PRIMA -> ATRIBUTOS_PRIMA 

                        $$ = {  "atributo": $2.atributo, "nodoCST": raiz}; 
                    //$2.unshift($1); 
                    //$$ = $2;
                } 
                | /*Epsilon*/                    {
                    var raiz = new nodoCST('AT_P'+ conta++,'ATRIBUTOS_PRIMA'); 
                        raiz.hijos.push(new nodoCST('epsilon'+ conta++,'epsilon')); //ATRIBUTOS_PRIMA -> EPSILON
                    $$ = {  "atributo": [], "nodoCST": raiz}; 
                    //$$ = [];
                } 
;

ATRIBUTO: Tag_ID Equal Alphanumeric         { 

        var raiz = new nodoCST('ATRIBUTO'+ conta++,'ATRIBUTO'); // inicializamos raiz de ATRIBUTO
            raiz.hijos.push(new nodoCST('Tag_ID' + conta++, $1));
            raiz.hijos.push(new nodoCST('Equal' + conta++ , '='));
            raiz.hijos.push(new nodoCST('Tag_ID' + conta++, String($3).replace(/"/g,'')));
        var newA = new Atributo((String($1).replace(/\s/g,'')), (String($3).replace(/"/g,'')), @1.first_line, @1.first_column);
        console.log("QUE CARAJO HAY AQUI??->", newA);
        $$ = { 
            "atributo" : newA, 
            "nodoCST": raiz
        }; 
}
;

/*
1) usar replace " en alphanumeric
2) Terminar el cst desc
3) agregar comentarios 
*/


