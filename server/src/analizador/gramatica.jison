%{
        const nodo_ast = require('./AST/nodo_ast');
        const error = require('./AST/errores.js');
		const token = require('./AST/tokens.js');

        var lista_errores = new Array();
		
        let cont =0;
%}

%lex
%options case-sensitive
%option yylineno
%option yyerrok

entero [0-9]+
decimal {entero}"."{entero}
identificador ([a-zA-ZñÑ] | "_")([a-zA-ZñÑ]|[0-9]|"_")*
caracter_escape [\'\"\\bfnrtv]
escape \\{caracter_escape}
cualquier [^\"\\]+
cadena_ (\"({escape}|{cualquier})*\")
caracter                ("'")[^']("'")

%%

//--> Comentarios
"//".*                              {/*Ignorar comentarios de una linea*/}
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}  

\s+                   /* skip whitespace */


{decimal}	    	return  'decimal'
{entero}	    	return  'num'
{cadena_}	    	return  'cadena'
{caracter}	    	return  'caracter'
"++"	            return  'inc'
"--"	            return  'dec'
"*"	            	return  'por'
"/"	            	return  'div'
";"	            	return  'pyc'
"-"	            	return  'menos'
"+"	            	return  'mas'
"^"                 return 'pot'
"||"	            return  'or'
"&&"	            return  'and'
"!="	            return  'diferente'
"!"	            	return  'not'
"<="	            return  'menor_igual'
">="	            return  'mayor_igual'
"<"	            	return  'menorq'
">"	            	return  'mayorq'
"=="	            return  'igual_igual'
"="	            	return  'igual'
"("	            	return  'para'
")"	            	return  'parc'
"}"	            	return  'llaveC'
"{"	            	return  'llaveA'
"["					return  'corA'
"]"					return  'corC'
"."	            	return  'punto'
","	            	return  'coma'
"int"	            return  'entero'
"String"	    	return  't_string'
"boolean"	    	return  'booleano'
"true"	            return  'verdadero'
"false"	            return  'falso'
"if"	            return  'si'
"else"	            return  'sino'
"void"	            return  'void_'
"while"	            return  'mientras'
"do"	            return  'hacer'
"println"	    	return  'imprimir'
"print"	            return  'imprimir'
"return"	    	return	'retorno'
"double"	    	return  'doble'
"char"	            return  't_caracter'
"public"	    	return  'publico'
"class"	            return  'clase'
"interface"	    	return  'inter'
"for"	            return  'c_for'
"break"	            return  'brk'
"static"	    	return  'statico'
"args" 				return	'argumentos'
"main"	            return  'reservada_main'
"continue"	    	return  'cont'
"System"	    	return  'sistem'
"out"	           	return  'salida'

{identificador}     return  'id'


[ \t\r\n\f] %{ /*se ignoran*/ %}

<<EOF>>				  return 'EOF'


.           lista_errores.push(new error("Caracter "+yytext +" no se esperaba." ,"LEXICO", yylineno+1, yylloc.last_column+1,yytext))

/lex

//--presedencia
%left       'id'
%right      'igual'
%left       'inc' 'dec'
%left       'or'
%left       'and'
%left       'igual_igual' 'diferente' 
%nonassoc  	'menorq' 'menor_igual' 'mayorq' 'mayor_igual'
%left       'mas' 'menos'
%left       'por' 'div' 'mod'
%right      'pot'
%right      'not' 'unario'
%left       'para' 'parc' 

%start INICIO

%%
//------------------INSTRUCCIONES GENERALES---------------
	INICIO : INSTRUCCIONES_I EOF 
								{
								var padre = new nodo_ast("AST","",this._$.first_line, this._$.first_column); 
								padre.hijos = $1; 
								var resultado = { ast : padre , L_errores : lista_errores}; 
								lista_errores = new Array(); 
								
								return resultado; 
								} 
				;
	INSTRUCCIONES_I: INSTRUCCIONES_I CLASES
											{
											$1.push($2); 
											$$= $1;
											}
						| INSTRUCCIONES_I INTERFACES
													{
													$1.push($2); 
													$$= $1;
													}
						| CLASES     
								{
								var l_inst = new Array(); 
								l_inst.push($1); 
								$$ = l_inst;
								}
						| INTERFACES     
									{
									var l_inst = new Array(); 
									l_inst.push($1); 
									$$ = l_inst;
									}
						|error pyc
								{
								lista_errores.push(new error("El token "+yytext +" no se esperaba." ,"SINTACTICO", yylineno+1, this._$.first_column,yytext)); 
								$$= new nodo_ast("ERROR","",-1,-1); 
								}
						| error llaveC
								{
								lista_errores.push(new error("El token "+yytext +" no se esperaba." ,"SINTACTICO", yylineno+1, this._$.first_column,yytext)); 
								$$= new nodo_ast("ERROR","",-1,-1); 
								}
						;
//--------------------------------------------------------
//------------------INSTRUCCIONES DE CLASES--------------- 
	CLASES : publico clase id llaveA INSTRUCCIONES_CLASSE llaveC  
																{
																var padre = new nodo_ast("clase","",0,0); 
																padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column, ""));
																padre.hijos.push(new nodo_ast("Res_Class",$2,this._$.first_line, @2.last_column,"class"));
																padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column,$3)); 
																padre.hijos.push(new nodo_ast("Llave_Abierta",$4,this._$.first_line, @4.last_column,`${$4}\n`));
																var l_inst = new nodo_ast("Lista_Instrucciones","",0,0);
																l_inst.hijos = $5;
																padre.hijos.push(l_inst);
																padre.hijos.push(new nodo_ast("Llave_Cerrada",$6,@6.first_line, @6.last_column, `\n${$6}`));
																$$ = padre; 
																}
						;
	INSTRUCCIONES_CLASSE: INSTRUCCIONES_CLASSE INSTRUCCION_CLASE 
															{
															$1.push($2); 
															$$ = $1; 
															}
                    | INSTRUCCION_CLASE 
										{
										var l_inst = new Array(); 
										l_inst.push($1); 
										$$=l_inst;
										} 
                    ;
	INSTRUCCION_CLASE: FUNCION  
									{
									$$ = $1;
									}
                | DECLARACION pyc   
									{
									$$ = $1;
									}
                | ASIGNACION pyc    
								{
								$$ = $1;
								}
                |error  
						{
						lista_errores.push(new error("El token -"+yytext +"- no se esperaba." ,"SINTACTICO", yylineno+1, this._$.first_column,yytext)); 
						$$= new nodo_ast("ERROR","",-1,-1); 
						}
                ;	
//--------------------------------------------------------
//------------------INSTRUCCIONES DE INTERFACES-----------
	INTERFACES : publico inter id llaveA INSTRUCCIONES_INTERFACESS llaveC  
																{
																var padre = new nodo_ast("interface","",0,0); 
																padre.hijos.push(new nodo_ast("Res_Public",$1,@1.first_line, @1.last_column));
																padre.hijos.push(new nodo_ast("Res_Interface",$2, @2.first_line, @2.last_column));
																padre.hijos.push(new nodo_ast("identificador",$3,@3.first_line, @3.last_column)); 
																padre.hijos.push(new nodo_ast("Llave_Abierta", $4, @4.first_line, @4.last_column));
																var l_inst = new nodo_ast("Lista_Instrucciones","",0,0);
																l_inst.hijos = $5;
																padre.hijos.push(l_inst);
																padre.hijos.push(new nodo_ast("Llave_Cerrada",$6,@6.first_line, @6.last_column));
																$$ = padre;
																}
					;

	INSTRUCCIONES_INTERFACESS: INSTRUCCIONES_INTERFACESS INSTRUCCION_INTERFACE 
																				{
																				$1.push($2); 
																				$$ = $1; 
																				}
						| INSTRUCCION_INTERFACE 
												{
												var l_inst = new Array(); 
												l_inst.push($1); 
												$$=l_inst;
												} 
						;
	INSTRUCCION_INTERFACE: FUNCIONI   
										{
										$$ = $1;
										}
                |error  
						{
						lista_errores.push(new error("El token -"+yytext +"- no se esperaba." ,"SINTACTICO", yylineno+1, this._$.first_column,yytext)); 
						$$= new nodo_ast("ERROR","",-1,-1); 
						}
                ;
//--------------------------------------------------------
//------------------INSTRUCCIONES DE CADA FUNCION Y METODO
	INSTRUCCIONES : INSTRUCCIONES INSTRUCCION  
											{
											$1.push($2); 
											$$ = $1; 
											}
				| INSTRUCCION  
								{
								var l_inst = new Array(); 
								l_inst.push($1); 
								$$=l_inst;
								}     
				;
	INSTRUCCION : DECLARACION pyc
								{
								$$ = $1;
								}
				| ASIGNACION pyc    
								{
								$$ = $1;
								}
				| IF                
					{
					$$ = $1;
					}
				| PRINT             
						{
						$$ = $1;
						}
				| DOWHILE           
						{
						$$ = $1;
						}
				| WHILE             
					{
					$$ = $1;
					}
				| FOR
					{
					$$ = $1;
					}
				| LLAMADA pyc     
							{
							$$ = $1;
							}
				| retorno EXP pyc   
								{
								var padre = new nodo_ast("RETORNO","",0, 0); 
								padre.hijos.push(new nodo_ast("Res_Return",$1,this._$.first_line, @1.last_column)); 
								padre.hijos.push($2); 
								padre.hijos.push(new nodo_ast("Punto_Coma",$3,this._$.first_line, @3.last_column));
								$$ = padre;
								}
				| brk pyc           
						{
						var padre = new nodo_ast("BREAK","",0, 0); 
						padre.hijos.push( new nodo_ast("Res_Breack",$1, this._$.first_line, @1.last_column)); 
						padre.hijos.push(new nodo_ast("Punto_Coma",$2,this._$.first_line, @2.last_column));
						$$ = padre;
						}
				| cont pyc
						{
						var padre = new nodo_ast("CONTINUE","",0, 0); 
						padre.hijos.push( new nodo_ast("Res_Continue",$1, this._$.first_line, @1.last_column)); 
						padre.hijos.push(new nodo_ast("Punto_Coma",$2,this._$.first_line, @2.last_column));
						$$ = padre;
						}
				| error
					{
					lista_errores.push(new error("El token -"+yytext +"- no se esperaba." ,"SINTACTICO", yylineno+1, this._$.first_column,yytext)); 
					$$= new nodo_ast("ERROR","",-1,-1); 
					}
				;	
//--------------------------------------------------------		
//------------------TIPO----------------------------------
	TIPO : entero      
				{
				$$ = new nodo_ast("Tipo",$1,this._$.first_line, this._$.last_column, "" );
				}
		| t_string     
				{
				$$ = new nodo_ast("Tipo",$1,this._$.first_line, this._$.last_column, "");
				}
		| t_caracter   
					{
					$$ = new nodo_ast("Tipo",$1,this._$.first_line, this._$.last_column, "");
					}
		| doble        
				{
				$$ = new nodo_ast("Tipo",$1,this._$.first_line, this._$.last_column, "");
				}
		| booleano
				{
				$$ = new nodo_ast("Tipo",$1,this._$.first_line, this._$.last_column, "");
				}
		;
//--------------------------------------------------------
//------------------DECLARACION---------------------------
	DECLARACION : TIPO L_ID igual EXP
									{ 
									var padre = new nodo_ast("DECLARACION","",this._$.last_line, this._$.last_column);
									var l_id = new nodo_ast("Lista_id","",0,0); 
									l_id.hijos = $2; 
									padre.hijos.push(l_id);
									padre.hijos.unshift($1); 
									padre.hijos.push(new nodo_ast("Igual",$3,this._$.last_line, @3.last_column, `${$3} `));  
									padre.hijos.push($4); 
									padre.hijos.push(new nodo_ast("Punto_Coma",";",this._$.last_line, this._$.last_column, `;\n `));  
									$$ = padre;
									}
				| TIPO L_ID igual LLAMADA
									{ 
									var padre = new nodo_ast("DECLARACION","",0,0);
									var l_id = new nodo_ast("Lista_id","",0,0); 
									l_id.hijos = $2; 
									padre.hijos.push(l_id);
									padre.hijos.unshift($1); 
									padre.hijos.push(new nodo_ast("Igual",$3,this._$.last_line, @3.last_column, `${$3}`));  
									padre.hijos.push($4); 
									$$ = padre;
									}
				| TIPO L_ID
							{
							var padre = new nodo_ast("DECLARACION","",this._$.last_line, this._$.last_column);
							var l_id = new nodo_ast("Lista_id","",0,0); 
							l_id.hijos = $2; 
							padre.hijos.push(l_id); 
							padre.hijos.unshift($1);
							padre.hijos.push(new nodo_ast("Punto_Coma",";",this._$.last_line, this._$.last_column,";\n")); 
							$$ = padre; 
							}
				;	
	L_ID : L_ID coma id 
					{
					$1.push(new nodo_ast("Coma",$2,this._$.last_line, this._$.last_column,", ")); 
					$1.push(new nodo_ast("identificador",$3,this._$.last_line, this._$.last_column,`${$3} `)); 
					
					$$ = $1;
					}
		| id   
			{ 
			var lista_id = new Array(); 
			var f_id = new nodo_ast("identificador",$1,this._$.first_line, this._$.last_column, `${$1} `); 
			lista_id.push(f_id); 
			$$ = lista_id;
			}
			;
//--------------------------------------------------------
//------------------ASIGNACION----------------------------
	ASIGNACION : id igual EXP 
							{
							var padre = new nodo_ast("ASIGNACION","",this._$.last_line, this._$.last_column); 
							padre.hijos.push( new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
							padre.hijos.push(new nodo_ast("Igual",$2,this._$.first_line, @2.last_column));
							padre.hijos.push($3); 
							padre.hijos.push(new nodo_ast("Punto_Coma",";",this._$.first_line, this._$.last_column));
							$$=padre;
							}
			| id igual LLAMADA 
							{
							var padre = new nodo_ast("ASIGNACION","",this._$.last_line, this._$.last_column); 
							padre.hijos.push( new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
							padre.hijos.push(new nodo_ast("Igual",$2,this._$.first_line, @2.last_column));
							padre.hijos.push($3); 
							$$=padre;
							}
			| id inc 
					{
					var padre = new nodo_ast("ASIGNACION","",this._$.last_line, this._$.last_column); 
					padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
					padre.hijos.push(new nodo_ast("Incremento",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push(new nodo_ast("Punto_Coma",";",this._$.first_line, this._$.last_column));
					$$=padre;
					}
			| id dec 
					{
					var padre = new nodo_ast("ASIGNACION","",this._$.last_line, this._$.last_column); 
					padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
					padre.hijos.push(new nodo_ast("Decremento",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push(new nodo_ast("Punto_Coma",";",this._$.first_line, this._$.last_column));
					$$=padre;
					}
				;
//--------------------------------------------------------
//------------------INSTRUCCIONES DE CONDICION IF---------
	IF : si para EXP parc llaveA INSTRUCCIONES llaveC 
													{
													var padre = new nodo_ast("IF","",0,0); 
													padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
													padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
													padre.hijos.push($3); 
													padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));
													padre.hijos.push(new nodo_ast("Llave_Abierta",$5,@5.first_line, @5.last_column));
													var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
													l_inst.hijos = $6;
													padre.hijos.push(l_inst); 
													padre.hijos.push(new nodo_ast("Llave_Cerrada",$7,@7.first_line, @7.last_column));
													$$ = padre; 
													}

		| si para EXP parc llaveA INSTRUCCIONES llaveC sino IF 
															{
															var padre = new nodo_ast("IF","",0,0); 
															padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
															padre.hijos.push($3); 
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));
															padre.hijos.push(new nodo_ast("Llave_Abierta",$5,@5.first_line, @5.last_column));
															var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
															l_inst.hijos = $6;
															padre.hijos.push(l_inst);  
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$7,@7.first_line, @7.last_column));
															padre.hijos.push(new nodo_ast("condicion_else",$8, @8.first_line,@8.last_column));
															padre.hijos.push($9);
															$$ = padre; 
															}

		| si para EXP parc llaveA INSTRUCCIONES llaveC sino llaveA INSTRUCCIONES llaveC 
															{
															var padre = new nodo_ast("IF","",0,0); 
															padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
															padre.hijos.push($3); 
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));
															padre.hijos.push(new nodo_ast("Llave_Abierta",$5, @5.first_line, @5.last_column));
															var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
															l_inst.hijos = $6;
															padre.hijos.push(l_inst);  
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$7,@7.first_line, @7.last_column));
															var else_ =new nodo_ast("condicion_else",$8,@8.first_line,@8.last_column);
															else_.hijos.push(new nodo_ast("Llave_Abierta",$9,@9.first_line, @9.last_column));
															var l_inst_else = new nodo_ast("Lista_Instrucciones","",0,0);
															l_inst_else.hijos = $10; else_.hijos.push(l_inst_else); 
															else_.hijos.push(new nodo_ast("Llave_Cerrada",$11,@11.first_line, @11.last_column));
															padre.hijos.push(else_); 
															$$ = padre; 
															}
		//---------------------------SIN INSTRUCCIONES
		|si para EXP parc llaveA  llaveC 
										{
										var padre = new nodo_ast("IF","",0,0); 
										padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
										padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
										padre.hijos.push($3); 
										padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));
										padre.hijos.push(new nodo_ast("Llave_Abierta",$5, @5.first_line, @5.last_column));
										padre.hijos.push(new nodo_ast("Llave_Cerrada",$6, @6.first_line, @6.last_column));
										$$ = padre; 
										}

		| si para EXP parc llaveA  llaveC sino IF 
													{
													var padre = new nodo_ast("IF","",0,0); 
													padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
													padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
													padre.hijos.push($3);
													padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));												
													padre.hijos.push(new nodo_ast("Llave_Abierta",$5, @5.first_line, @5.last_column));
													padre.hijos.push(new nodo_ast("Llave_Cerrada",$6, @6.first_line, @6.last_column));
													padre.hijos.push(new nodo_ast("condicion_else",$7,@7.first_line,@7.last_column));
													padre.hijos.push($8);
													$$ = padre; 
													}

		| si para EXP parc llaveA  llaveC sino llaveA INSTRUCCIONES llaveC 
																		{
																		var padre = new nodo_ast("IF","",0,0); 
																		padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
																		padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
																		padre.hijos.push($3); 
																		padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));		
																		padre.hijos.push(new nodo_ast("Llave_Abierta",$5,@5.first_line, @5.last_column));
																		padre.hijos.push(new nodo_ast("Llave_Cerrada",$6,@6.first_line, @6.last_column));																	
																		var else_ =new nodo_ast("condicion_else",$7,@7.first_line,@7.last_column);
																		else_.hijos.push(new nodo_ast("Llave_Abierta",$8,@8.first_line, @8.last_column));
																		var l_inst_else = new nodo_ast("Lista_Instrucciones","",0,0);
																		l_inst_else.hijos = $9; 
																		else_.hijos.push(l_inst_else); 
																		else_.hijos.push(new nodo_ast("Llave_Cerrada",$10, @10.first_line, @10.last_column));
																		padre.hijos.push(else_); 
																		$$ = padre; 
																		}
		| si para EXP parc llaveA INSTRUCCIONES llaveC sino llaveA  llaveC 
															{
															var padre = new nodo_ast("IF","",0,0); 
															padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
															padre.hijos.push($3); 
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));
															padre.hijos.push(new nodo_ast("Llave_Abierta",$5, @5.first_line, @5.last_column));
															var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
															l_inst.hijos = $6;
															padre.hijos.push(l_inst);  
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$7, @7.first_line, @7.last_column));
															var else_ =new nodo_ast("condicion_else",$8,@8.first_line,@8.last_column);
															else_.hijos.push(new nodo_ast("Llave_Abierta",$9, @9.first_line, @9.last_column));
															else_.hijos.push(new nodo_ast("Llave_Cerrada",$10, @10.first_line, @10.last_column));
															padre.hijos.push(else_); 
															$$ = padre; 
															}
		| si para EXP parc llaveA  llaveC sino llaveA  llaveC 
															{
															var padre = new nodo_ast("IF","",0,0); 
															padre.hijos.push(new nodo_ast("condicion_if",$1,@1.first_line,@1.last_column));
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
															padre.hijos.push($3); 
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));		
															padre.hijos.push(new nodo_ast("Llave_Abierta",$5, @5.first_line, @5.last_column));
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$6, @6.first_line, @6.last_column));	
															var else_ =new nodo_ast("condicion_else",$7,@7.first_line,@7.last_column);
															else_.hijos.push(new nodo_ast("Llave_Abierta",$8, @8.first_line, @8.last_column));
															else_.hijos.push(new nodo_ast("Llave_Cerrada",$9, @9.first_line, @9.last_column));
															padre.hijos.push(else_); 
															$$ = padre; 
															}
						;
//--------------------------------------------------------
//------------------SENTENCIAS DE REPETICION WHILE--------
	WHILE : mientras para EXP parc llaveA INSTRUCCIONES llaveC 
															{
															var padre = new nodo_ast("WHILE","",0,0); 
															padre.hijos.push(new nodo_ast("ciclo_while",$1,@1.first_line,@1.last_column));
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
															padre.hijos.push($3);
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));	
															padre.hijos.push(new nodo_ast("Llave_Abierta",$5,@5.first_line, @5.last_column));														
															var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
															l_inst.hijos = $6;
															padre.hijos.push(l_inst); 
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$7,@7.first_line, @7.last_column));	
															$$ = padre; 
															}
		| mientras para EXP parc llaveA  llaveC  
											{
											var padre = new nodo_ast("WHILE","",0,0); 
											padre.hijos.push(new nodo_ast("ciclo_while",$1,@1.first_line,@1.last_column));
											padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
											padre.hijos.push($3);
											padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));	
											padre.hijos.push(new nodo_ast("Llave_Abierta",$5,@5.first_line, @5.last_column));
											padre.hijos.push(new nodo_ast("Llave_Cerrada",$6,@6.first_line, @6.last_column));											
											$$ = padre; 
											}
		;
//--------------------------------------------------------
//------------------SENTENCIAS DE REPETICION DOWHILE------
	DOWHILE : hacer llaveA INSTRUCCIONES llaveC mientras para EXP parc pyc 
																		{
																		var padre = new nodo_ast("Do_WHILE","",0,0); 
																		padre.hijos.push(new nodo_ast("ciclo_do",$1,@1.first_line,@1.last_column));
																		padre.hijos.push(new nodo_ast("Llave_Abierta",$2,@2.first_line, @2.last_column));
																		var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
																		l_inst.hijos = $3; 
																		padre.hijos.push(l_inst);
																		padre.hijos.push(new nodo_ast("Llave_Cerrada",$4,@4.first_line, @4.last_column));
																		padre.hijos.push(new nodo_ast("ciclo_while",$5,@5.first_line,@5.last_column)); 
																		padre.hijos.push(new nodo_ast("Parentesis_Abierto",$6,this._$.first_line, @6.last_column));
																		padre.hijos.push($7);
																		padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$8,this._$.first_line, @8.last_column));
																		padre.hijos.push(new nodo_ast("Punto_Coma",$9,this._$.first_line, @9.last_column));
																		$$ = padre; 
																		}
			| hacer llaveA  llaveC mientras para EXP parc pyc 
															{
															var padre = new nodo_ast("Do_WHILE","",0,0); 
															padre.hijos.push(new nodo_ast("ciclo_do",$1,@1.first_line,@1.last_column));
															padre.hijos.push(new nodo_ast("Llave_Abierta",$2,@2.first_line, @2.last_column));
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$3,@3.first_line, @3.last_column));                                                        
															padre.hijos.push(new nodo_ast("ciclo_while",$4,@4.first_line,@4.last_column)); 
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$5,this._$.first_line, @5.last_column));
															padre.hijos.push($6);
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$7,this._$.first_line, @7.last_column));
															padre.hijos.push(new nodo_ast("Punto_Coma",$8,this._$.first_line, @8.last_column));
															$$ = padre; 
															}
			;
//--------------------------------------------------------
//------------------SENTENCIAS DE REPETICION FOR----------
	FOR : c_for para DECLARACIONFOR pyc EXP pyc ASIGNACIONFOR  parc llaveA INSTRUCCIONES llaveC 
																						{
																						var padre = new nodo_ast("FOR","",0,0); 
																						padre.hijos.push(new nodo_ast("ciclo_for",$1,@1.first_line,@1.last_column));
																						padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
																						padre.hijos.push($3); 
																						padre.hijos.push(new nodo_ast("Punto_Coma",$4,this._$.first_line, @4.last_column));
																						padre.hijos.push($5);
																						padre.hijos.push(new nodo_ast("Punto_Coma",$6,this._$.first_line, @6.last_column));
																						padre.hijos.push($7);  
																						padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$8,this._$.first_line, @8.last_column));
																						padre.hijos.push(new nodo_ast("Llave_Abierta",$9,this._$.first_line, @9.last_column));
																						var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
																						l_inst.hijos = $10; 
																						padre.hijos.push(l_inst);  
																						padre.hijos.push(new nodo_ast("Llave_Cerrada",$11,@11.first_line, @11.last_column));
																						$$ = padre;
																						}
		| c_for para DECLARACIONFOR  pyc EXP pyc ASIGNACIONFOR  parc llaveA  llaveC 
																			{
																			var padre = new nodo_ast("FOR","",0,0); 
																			padre.hijos.push(new nodo_ast("ciclo_for",$1,@1.first_line,@1.last_column));
																			padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
																			padre.hijos.push($3); 
																			padre.hijos.push(new nodo_ast("Punto_Coma",$4,this._$.first_line, @4.last_column));
																			padre.hijos.push($5);
																			padre.hijos.push(new nodo_ast("Punto_Coma",$6,this._$.first_line, @6.last_column));
																			padre.hijos.push($7);  
																			padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$8,this._$.first_line, @8.last_column));
																			padre.hijos.push(new nodo_ast("Llave_Abierta",$9,@9.first_line, @9.last_column));
																			padre.hijos.push(new nodo_ast("Llave_Cerrada",$10, @10.first_line, @10.last_column));
																			$$ = padre;
																			}
		| c_for para ASIGNACIONFOR  pyc EXP pyc ASIGNACIONFOR  parc llaveA INSTRUCCIONES llaveC 
																						{
																						var padre = new nodo_ast("FOR","",0,0); 
																						padre.hijos.push(new nodo_ast("ciclo_for",$1,@1.first_line,@1.last_column));
																						padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
																						padre.hijos.push($3); 
																						padre.hijos.push(new nodo_ast("Punto_Coma",$4,this._$.first_line, @4.last_column));
																						padre.hijos.push($5);
																						padre.hijos.push(new nodo_ast("Punto_Coma",$6,this._$.first_line, @6.last_column));
																						padre.hijos.push($7);  
																						padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$8,this._$.first_line, @8.last_column));
																						padre.hijos.push(new nodo_ast("Llave_Abierta",$9, @9.first_line, @9.last_column));
																						var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
																						l_inst.hijos =$10; 
																						padre.hijos.push(l_inst);  
																						padre.hijos.push(new nodo_ast("Llave_Cerrada",$11,@11.first_line, @11.last_column));
																						$$ = padre;
																						}
		| c_for para ASIGNACIONFOR  pyc EXP pyc ASIGNACIONFOR  parc llaveA  llaveC 
																			{
																			var padre = new nodo_ast("FOR","",0,0); 
																			padre.hijos.push(new nodo_ast("ciclo_for",$1,@1.first_line,@1.last_column));
																			padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
																			padre.hijos.push($3); 
																			padre.hijos.push(new nodo_ast("Punto_Coma",$4,this._$.first_line, @4.last_column));
																			padre.hijos.push($5);
																			padre.hijos.push(new nodo_ast("Punto_Coma",$6,this._$.first_line, @6.last_column));
																			padre.hijos.push($7);  
																			padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$8,this._$.first_line, @8.last_column));
																			padre.hijos.push(new nodo_ast("Llave_Abierta",$9,@9.first_line, @9.last_column));
																			padre.hijos.push(new nodo_ast("Llave_Cerrada",$10,@10.first_line, @10.last_column));
																			$$ = padre;
																			}
					;
	DECLARACIONFOR : TIPO L_ID igual EXP
									{ 
									var padre = new nodo_ast("DECLARACION","",this._$.last_line, this._$.last_column);
									var l_id = new nodo_ast("Lista_id","",0,0); 
									l_id.hijos = $2; 
									padre.hijos.push(l_id);
									padre.hijos.unshift($1); 
									padre.hijos.push(new nodo_ast("Igual",$3,this._$.last_line, @3.last_column));  
									padre.hijos.push($4); 
									
									$$ = padre;
									}

				;	
	ASIGNACIONFOR : id igual EXP 
						{
						var padre = new nodo_ast("ASIGNACION","",this._$.last_line, this._$.last_column); 
						padre.hijos.push( new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
						padre.hijos.push(new nodo_ast("Igual",$2,this._$.first_line, @2.last_column));
						padre.hijos.push($3); 
						$$=padre;
						}
		| id inc 
				{
				var padre = new nodo_ast("ASIGNACION","",this._$.last_line, this._$.last_column); 
				padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
				padre.hijos.push(new nodo_ast("Incremento",$2,this._$.first_line, @2.last_column)); 
				$$=padre;
				}
		| id dec 
				{
				var padre = new nodo_ast("ASIGNACION","",this._$.last_line, this._$.last_column); 
				padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
				padre.hijos.push(new nodo_ast("Decremento",$2,this._$.first_line, @2.last_column)); 
				$$=padre;
				}
			;
//--------------------------------------------------------
//------------------FUNCIONES-----------------------------
	L_PARAMETROS : L_PARAMETROS coma PARAMETRO 
											{
											$1.push(new nodo_ast("Coma",$2,this._$.first_line, @2.last_column,`${$2} `));
											$1.push($3); 
											$$ = $1;
											}
				| PARAMETRO 
							{
							var l_para = new Array(); 
							l_para.push($1); 
							$$ = l_para;
							}
				;
	PARAMETRO : TIPO id 
						{
						var padre = new nodo_ast("PARAMETRO","",0,0); 
						padre.hijos.push($1); 
						var id_ = new nodo_ast("identificador",$2,this._$.last_line, this._$.last_column, `${$2} `); 
						padre.hijos.push(id_); 
						$$ = padre;
						}
			;				
	FUNCION : publico TIPO id para L_PARAMETROS parc llaveA INSTRUCCIONES llaveC    
																		{
																		var padre = new nodo_ast("FUNCION","",0,0); 
																		padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column, "function"));
																		padre.hijos.push($2);
																		padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column,`${$3} ` ));
																		padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column, `${$4} `));
																		var para = new nodo_ast("Lista_Parametros","",0,0); 
																		para.hijos = $5; 
																		padre.hijos.push(para);
																		padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$6,this._$.first_line, @6.last_column, `${$6} `));
																		padre.hijos.push(new nodo_ast("Llave_Abierta",$7,this._$.first_line, @7.last_column, `${$7}\n `));
																		var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
																		l_inst.hijos = $8; 
																		padre.hijos.push(l_inst); 
																		padre.hijos.push(new nodo_ast("Llave_Cerrada",$9,@9.first_line, @9.last_column, `${$9}\n `));
																		$$ = padre;
																		}
			| publico TIPO id para parc  llaveA INSTRUCCIONES llaveC 
															{
															var padre = new nodo_ast("FUNCION","",0,0); 
															padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column,""));
															padre.hijos.push($2);
															padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column,  `${$3} `));
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column,  `${$4}`));
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$5,this._$.first_line, @5.last_column,  `${$5} `));
															padre.hijos.push(new nodo_ast("Llave_Abierta",$6,this._$.first_line, @6.last_column,  `${$6}\n `));
															var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
															l_inst.hijos = $7; 
															padre.hijos.push(l_inst); 
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$8,@8.first_line, @8.last_column,  `${$8}\n `));
															$$ = padre;
															}
			| publico TIPO id para L_PARAMETROS parc llaveA  llaveC 
															{
															var padre = new nodo_ast("FUNCION","",0,0); 
															padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column));
															padre.hijos.push($2);
															padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
															padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column));
															var para = new nodo_ast("Lista_Parametros","",0,0); 
															para.hijos = $5; 
															padre.hijos.push(para);
															padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$6,@6.first_line, @6.last_column));
															padre.hijos.push(new nodo_ast("Llave_Abierta",$7,@7.first_line, @7.last_column));
															padre.hijos.push(new nodo_ast("Llave_Cerrada",$8,@8.first_line, @8.last_column));
															$$ = padre;
															}
			| publico TIPO id para parc  llaveA  llaveC     
												{
												var padre = new nodo_ast("FUNCION","",0,0); 
												padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column));
												padre.hijos.push($2);
												padre.hijos.push(new nodo_ast("identificador",$3, @3.first_line, @3.last_column));
												padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4, @4.first_line, @4.last_column));
												padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$5, @5.first_line, @5.last_column));
												padre.hijos.push(new nodo_ast("Llave_Abierta",$6, @6.first_line, @6.last_column));
												padre.hijos.push(new nodo_ast("Llave_Cerrada",$7, @7.first_line, @7.last_column));
												$$ = padre;
												}

			| publico void_ id para L_PARAMETROS parc llaveA INSTRUCCIONES llaveC 
													{
													var padre = new nodo_ast("METODO","",0,0); 
													padre.hijos.push(new nodo_ast("Res_Public", $1, this._$.first_line, @1.last_column));
													padre.hijos.push(new nodo_ast("Res_Void",$2,this._$.first_line, @2.last_column));
													padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
													padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column, `${$4}`));
													var para = new nodo_ast("Lista_Parametros","",0,0); 
													para.hijos = $5;  
													padre.hijos.push(para);
													padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$6,this._$.first_line, @6.last_column, `${$6}`));
													padre.hijos.push(new nodo_ast("Llave_Abierta",$7,this._$.first_line, @7.last_column));
													var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
													l_inst.hijos = $8; 
													padre.hijos.push(l_inst); 
													padre.hijos.push(new nodo_ast("Llave_Cerrada",$9,@9.first_line, @9.last_column));
													$$ = padre;
													}
			| publico void_ id para parc  llaveA INSTRUCCIONES llaveC 
													{
													var padre = new nodo_ast("METODO","",0,0); 
													padre.hijos.push(new nodo_ast("Res_Public", $1, this._$.first_line, @1.last_column));
													padre.hijos.push(new nodo_ast("Res_Void",$2,this._$.first_line, @2.last_column));
													padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
													padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column));
													padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$5,this._$.first_line, @5.last_column));
													padre.hijos.push(new nodo_ast("Llave_Abierta",$6,this._$.first_line, @6.last_column));
													var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
													l_inst.hijos = $7; 
													padre.hijos.push(l_inst); 
													padre.hijos.push(new nodo_ast("Llave_Cerrada",$8,@8.first_line, @8.last_column));
													$$ = padre;
													}
			| publico void_ id para L_PARAMETROS parc llaveA  llaveC 
													{
													var padre = new nodo_ast("METODO","",0,0); 
													padre.hijos.push(new nodo_ast("Res_Public", $1, this._$.first_line, @1.last_column));
													padre.hijos.push(new nodo_ast("Res_Void",$2,this._$.first_line, @2.last_column));
													padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
													padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column));
													var para = new nodo_ast("Lista_Parametros","",0,0);  
													para.hijos = $5; 
													padre.hijos.push(para);
													padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$6, @6.first_line, @6.last_column));
													padre.hijos.push(new nodo_ast("Llave_Abierta",$7, @7.first_line, @7.last_column));
													padre.hijos.push(new nodo_ast("Llave_Cerrada",$8, @8.first_line, @8.last_column)); 
													$$ = padre;
													}
			| publico void_ id para parc  llaveA  llaveC  
												{
												var padre = new nodo_ast("METODO","",0,0); 
												padre.hijos.push(new nodo_ast("Res_Public", $1, this._$.first_line, @1.last_column));
												padre.hijos.push(new nodo_ast("Res_Void",$2,this._$.first_line, @2.last_column));
												padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
												padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column));
												padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$5,this._$.first_line, @5.last_column));
												padre.hijos.push(new nodo_ast("Llave_Abierta",$6, @6.first_line, @6.last_column));
												padre.hijos.push(new nodo_ast("Llave_Cerrada",$7, @7.first_line, @7.last_column));
												$$ = padre;
												}
			| publico statico void_ reservada_main para t_string corA corC argumentos parc llaveA INSTRUCCIONES llaveC
																		{ 
																		var padre = new nodo_ast("METODO_MAIN","",0,0);
																		padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column));
																		padre.hijos.push(new nodo_ast("Res_Static",$2,this._$.first_line, @2.last_column)); 
																		padre.hijos.push(new nodo_ast("Res_Void",$3,this._$.first_line, @3.last_column)); 
																		padre.hijos.push(new nodo_ast("Res_Main",$4,this._$.first_line, @4.last_column));
																		padre.hijos.push(new nodo_ast("Parentesis_Abierto",$5,this._$.first_line, @5.last_column));
																		padre.hijos.push(new nodo_ast("Tipo",$6,this._$.first_line, @6.last_column));
																		padre.hijos.push(new nodo_ast("Corchete_Abierto",$7,this._$.first_line, @7.last_column));
																		padre.hijos.push(new nodo_ast("Corchete_Cerrado",$8,this._$.first_line, @8.last_column));
																		padre.hijos.push(new nodo_ast("Res_args",$9,this._$.first_line, @9.last_column));
																		padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$10,this._$.first_line, @10.last_column));
																		padre.hijos.push(new nodo_ast("Llave_Abierta",$11,@11.first_line, @11.last_column));
																		var l_inst = new nodo_ast("Lista_Instrucciones","",0,0); 
																		l_inst.hijos = $12;
																		padre.hijos.push(l_inst); 
																		padre.hijos.push(new nodo_ast("Llave_Cerrada",$13, @12.first_line, @12.last_column));
																		$$ = padre; 
																		}
			;
//--------------------------------------------------------
//------------------FUNCIONES INTERFACES------------------
	FUNCIONI : publico TIPO id para L_PARAMETROS parc pyc   
											{
											var padre = new nodo_ast("FUNCION","",0,0); 
											padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column));
											padre.hijos.push($2);
											padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
											padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column));
											var para = new nodo_ast("Lista_Parametros","",0,0); 
											para.hijos = $5; 
											padre.hijos.push(para);
											padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$6,this._$.first_line, @6.last_column));
											padre.hijos.push(new nodo_ast("Punto_Coma",$7,this._$.first_line, @7.last_column));
											$$ = padre;
											}
			| publico TIPO id para parc pyc
								{
								var padre = new nodo_ast("FUNCION","",0,0); 
								padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column));
								padre.hijos.push($2);
								padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.first_column));
								padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.first_column));
								padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$5,this._$.first_line, @5.first_column));
								padre.hijos.push(new nodo_ast("Punto_Coma",$6,this._$.first_line, @6.first_column));
								$$ = padre;
								}

			| publico void_ id para L_PARAMETROS parc pyc
											{
											var padre = new nodo_ast("METODO","",0,0); 
											padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column));
											padre.hijos.push(new nodo_ast("Res_Void",$2,this._$.first_line, @2.last_column));
											padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
											padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column));
											var para = new nodo_ast("Lista_Parametros","",0,0); 
											para.hijos = $5;  
											padre.hijos.push(para);
											padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$6,this._$.first_line, @6.last_column));
											padre.hijos.push(new nodo_ast("Punto_Coma",$7,this._$.first_line, @7.first_column));
											$$ = padre;
											}
			| publico void_ id para parc pyc
								{
								var padre = new nodo_ast("METODO","",0,0); 
								padre.hijos.push(new nodo_ast("Res_Public",$1,this._$.first_line, @1.last_column));
								padre.hijos.push(new nodo_ast("Res_Void",$2,this._$.first_line, @2.last_column));
								padre.hijos.push(new nodo_ast("identificador",$3,this._$.first_line, @3.last_column));
								padre.hijos.push(new nodo_ast("Parentesis_Abierto",$4,this._$.first_line, @4.last_column));
								padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$5,this._$.first_line, @5.last_column));
								padre.hijos.push(new nodo_ast("Punto_Coma",$6,this._$.first_line, @6.first_column));
								$$ = padre;
								}
			;
//--------------------------------------------------------
//------------------LLAMADA DE FUNCIONES -----------------
	LLAMADA : id para L_EXP parc 
								{ 
								var padre = new nodo_ast("LLAMADA","",0,0); 
								padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column)); 
								padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
								var para = new nodo_ast("PARAMETROS","",0,0); 
								para.hijos = $3; 
								padre.hijos.push(para); 
								padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$4,this._$.first_line, @4.last_column));
								padre.hijos.push(new nodo_ast("Punto_Coma",";",this._$.first_line, this._$.last_column));
								$$ = padre;
								}
			| id para parc 
						{ 
						var padre = new nodo_ast("LLAMADA","",0,0); 
						padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column)); 
						padre.hijos.push(new nodo_ast("Parentesis_Abierto",$2,this._$.first_line, @2.last_column));
						padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$3,this._$.first_line, @3.last_column));
						padre.hijos.push(new nodo_ast("Punto_Coma",";",this._$.first_line, this._$.last_column));
						$$ = padre;
						}
			;
	L_EXP : L_EXP coma EXP 
						{
						$1.push(new nodo_ast("Coma",$2,this._$.last_line, @2.last_column)); 
						$1.push($3); 
						$$= $1;
						}
			| EXP 
				{ 
				var a = new Array(); 
				a.push($1); 
				$$ = a; 
				}
			;
//--------------------------------------------------------
//------------------IMPRIMIR------------------------------
	PRINT : sistem punto salida punto imprimir para EXP parc pyc 
																{
																var padre = new nodo_ast("IMPRIMIR","",0,0);
																padre.hijos.push(new nodo_ast("Res_System",$1, this._$.first_line , @1.last_column))
																padre.hijos.push(new nodo_ast("punto",$2, this._$.first_line , @2.last_column))
																padre.hijos.push(new nodo_ast("Res_Out",$3, this._$.first_line , @3.last_column))
																padre.hijos.push(new nodo_ast("punto",$4, this._$.first_line , @4.last_column))
																padre.hijos.push(new nodo_ast("Res_Print",$5, this._$.first_line , @5.last_column))
																padre.hijos.push(new nodo_ast("Parentesis_Abierto",$6, this._$.first_line , @6.last_column))
																padre.hijos.push($7); 
																padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$8, this._$.first_line , @8.last_column))
																padre.hijos.push(new nodo_ast("Punto_Coma",$9, this._$.first_line , @9.last_column))
																$$= padre;
																}
			;
//--------------------------------------------------------
//------------------EXPRESIONES---------------------------
	EXP : menos EXP %prec unario    
								{
								var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column);
								padre.hijos.push(new nodo_ast("op_aritmetica",$1,this._$.first_line, @1.last_column)); 
								padre.hijos.push($2); 
								$$ = padre;
								}
		| not EXP   
				{
				var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
				padre.hijos.push(new nodo_ast("op_logica",$1,this._$.first_line, @1.last_column)); 
				padre.hijos.push($2); 
				$$ = padre;
				}
		| EXP mas EXP       
					{
					var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
					padre.hijos.push($1); 
					padre.hijos.push(new nodo_ast("op_aritmetica",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push($3); 
					$$ = padre;
					}
		| EXP menos EXP     
						{
						var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
						padre.hijos.push($1); 
						padre.hijos.push(new nodo_ast("op_aritmetica",$2,this._$.first_line, @2.last_column)); 
						padre.hijos.push($3); 
						$$ = padre;
						} 
		| EXP por EXP       
					{
					var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
					padre.hijos.push($1); 
					padre.hijos.push(new nodo_ast("op_aritmetica",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push($3); 
					$$ = padre;
					} 
		| EXP div EXP       
					{
					var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
					padre.hijos.push($1); 
					padre.hijos.push(new nodo_ast("op_aritmetica",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push($3); 
					$$ = padre;
					}
		| EXP pot EXP       
					{
					var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
					padre.hijos.push($1); 
					padre.hijos.push(new nodo_ast("op_logica",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push($3); 
					$$ = padre;
					}
		| EXP menorq EXP    
						{
						var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
						padre.hijos.push($1); 
						padre.hijos.push(new nodo_ast("op_relacional",$2,this._$.first_line, @2.last_column)); 
						padre.hijos.push($3); 
						$$ = padre;
						}
		| EXP mayorq EXP    
						{
						var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
						padre.hijos.push($1); 
						padre.hijos.push(new nodo_ast("op_relacional",$2,this._$.first_line, @2.last_column)); 
						padre.hijos.push($3); 
						$$ = padre;
						}
		| EXP menor_igual EXP 
							{
							var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
							padre.hijos.push($1); 
							padre.hijos.push(new nodo_ast("op_relacional",$2,this._$.first_line, @2.last_column)); 
							padre.hijos.push($3); 
							$$ = padre;
							}
		| EXP mayor_igual EXP 
							{
							var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
							padre.hijos.push($1); 
							padre.hijos.push(new nodo_ast("op_relacional",$2,this._$.first_line, @2.last_column)); 
							padre.hijos.push($3); 
							$$ = padre;
							}
		| EXP igual_igual EXP 
							{
							var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
							padre.hijos.push($1); 
							padre.hijos.push(new nodo_ast("op_relacional",$2,this._$.first_line, @2.last_column)); 
							padre.hijos.push($3); 
							$$ = padre;
							}
		| EXP diferente EXP 
							{
							var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
							padre.hijos.push($1); 
							padre.hijos.push(new nodo_ast("op_relacional",$2,this._$.first_line, @2.last_column)); 
							padre.hijos.push($3); 
							$$ = padre;
							}
		| EXP and EXP       
					{
					var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
					padre.hijos.push($1); 
					padre.hijos.push(new nodo_ast("op_logica",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push($3); 
					$$ = padre;
					}
		| EXP or EXP        
					{
					var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
					padre.hijos.push($1); 
					padre.hijos.push(new nodo_ast("op_logica",$2,this._$.first_line, @2.last_column)); 
					padre.hijos.push($3); 
					$$ = padre;
					}
		| num       
			{
			$$ = new nodo_ast("int",$1,this._$.first_line, this._$.last_column);
			}
		| id        
			{ 
			$$ = new nodo_ast("identificador",$1,this._$.first_line, this._$.last_column);
			}
		| decimal   
			`	{
				$$ = new nodo_ast("double",$1,this._$.first_line, this._$.last_column);
				}
		| cadena    
				{
				$$ = new nodo_ast("cadena",$1,this._$.first_line, this._$.last_column);
				}
		| caracter  
				{
				$$ = new nodo_ast("char",$1,this._$.first_line, this._$.last_column);
				}
		| verdadero 
				{ 
				$$ = new nodo_ast("boolean",$1,this._$.first_line, this._$.last_column);
				}
		| falso     
			{ 
			$$ = new nodo_ast("boolean",$1,this._$.first_line, this._$.last_column);
			}
		| id inc    
				{ 
				var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
				padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
				padre.hijos.push(new nodo_ast("Adicion",$2,this._$.first_line, @2.last_column));
				$$ = padre;
				}
		| id dec    
				{ 
				var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
				padre.hijos.push(new nodo_ast("identificador",$1,this._$.first_line, @1.last_column));
				padre.hijos.push(new nodo_ast("Sustraccion",$2,this._$.first_line, @2.last_column));
				$$ = padre;
				}
		| para EXP parc 
					{
					var padre = new nodo_ast("EXP","",this._$.first_line, this._$.last_column); 
					padre.hijos.push(new nodo_ast("Parentesis_Abierto",$1,this._$.first_line, @1.last_column));
					padre.hijos.push($2); 
					padre.hijos.push(new nodo_ast("Parentesis_Cerrado",$3,@3.first_line,@3.last_column)); 
					$$ = padre;
					}
		;
//--------------------------------------------------------