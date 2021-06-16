function ejecutarCodigo() {
    var entradaXML = getXML();
    var entradaQuery = getXPath();
    var xml = gramatica1.parse(entradaXML);
    var query = gramatica.parse(entradaQuery);
    const entornoGlobal = new Ambito(null);
    console.log(xml);
    /*Object.values(xml.lista_elementos).forEach(elemento => {
        console.log(elemento.identificador);
    });*/
    recorrerXML(xml);
}

function recorrerXML(xml){
    for(var key in xml){
        if(xml.hasOwnProperty(key)){
            var val = xml[key];
            console.log(val);
            recorrerXML(val);
        }
    }
}