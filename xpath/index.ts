const gramatica = require('../Gramatica/gramatica');



function ejecutarCodigo (entrada:string){
    const objetos = gramatica.parse(entrada);
   //console.table(objetos);
}

ejecutarCodigo(`
    print(1);
    print(true);
    print("hola mundo");
`);