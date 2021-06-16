function ejecutarCodigo() {
    var entradaXML = getXML();
    var entradaQuery = getXPath();
    var xml = new Elemento(null);    
    xml = Gramatica1.parse(entradaXML);
    //console.log(xml);
    var query = gramatica.parse(entradaQuery);
    //console.log(query);
    query.forEach(consulta => {
        consulta.forEach(nodo => {
            //console.log(nodo);
        })
    });
    getSubXML(xml);
    //xml.construirTablaSimbolos(ambitoGlobal);
    
}

function getSubXML(xml){
    console.log(xml);
    xml.lista_elementos.forEach(elemento => {
        console.log(elemento.identificador);
        getSubXML(xml.lista_elementos);
    })
}

