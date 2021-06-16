function ejecutarCodigo() {
    var entradaXML = getXML();
    var entradaQuery = getXPath();
    var xml = Gramatica1.parse(entradaXML);
    var query = gramatica.parse(entradaQuery);
    const ambitoGlobal = new Ambito(null);
    console.log(query);
    query.forEach(consulta => {
        consulta.forEach(nodo => {
            console.log(nodo);
        })
    });
    /*Object.values(xml.lista_elementos).forEach(elemento => {
        console.log(elemento.identificador);
    });*/
    xml.construirTablaSimbolos(ambitoGlobal);
    
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

