package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
)

type clase struct {
	Entrada string
}

var nodeURL = ""
var nodeURL2 = ""

func index(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("index.html"))
	t.Execute(w, nil)
}

func repErrores(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("./reportes/errores.html"))
	t.Execute(w, nil)
}

func repErroresP(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("./reportes/erroresP.html"))
	t.Execute(w, nil)
}

func repTokens(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("./reportes/tokens.html"))
	t.Execute(w, nil)
}

func repTokensP(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("./reportes/tokensP.html"))
	t.Execute(w, nil)
}

func arbol(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("./reportes/AST.html"))
	t.Execute(w, nil)
}

func arbolP(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("./reportes/AST1.html"))
	t.Execute(w, nil)
}

func generate(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL + "/AST/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}

func generateP(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL2 + "/AST/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}

func generateError(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL + "/errores/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}

func generateErrorP(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL2 + "/err/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}

func generateToken(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL + "/tokens/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}

func generateTokenP(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL2 + "/tk/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}

func traduceJS(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL + "/descargarJS/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}
func traducePY(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL2 + "/descargarPY/"
	clienteHttp := &http.Client{}

	peticion, err := http.NewRequest("GET", url, nil)

	if err != nil {
		panic(err)
	}

	respuesta, err := clienteHttp.Do(peticion)
	if err != nil {
		panic(err)
	}

	defer respuesta.Body.Close()

	cuerpoRespeusta, err := ioutil.ReadAll(respuesta.Body)

	if err != nil {
		panic(err)
	}

	respuestaString := string(cuerpoRespeusta)
	//fmt.Println(respuestaString)
	fmt.Fprintf(w, respuestaString)
}

func analizarJS(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL + "/analizar"
	var c clase

	decoder := json.NewDecoder(r.Body)

	decoder.Decode(&c)

	jsonValue, _ := json.Marshal(c)
	//fmt.Printf("%+v\n", c)
	u := bytes.NewReader(jsonValue)

	req, err := http.NewRequest("POST", url, u)

	if err != nil {
		fmt.Println("Error is req: ", err)
	}

	req.Header.Set("Content-Type", "application/json")

	cliente := &http.Client{}

	resp, err := cliente.Do(req)
	if err != nil {
		fmt.Println("error in send req: ", err.Error())
		w.WriteHeader(400)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	//fmt.Println(string(bodyBytes))
	fmt.Fprintf(w, string(bodyBytes))

}

func analizarPY(w http.ResponseWriter, r *http.Request) {
	var url = nodeURL2 + "/analizar"
	var c clase

	decoder := json.NewDecoder(r.Body)

	decoder.Decode(&c)

	jsonValue, _ := json.Marshal(c)
	//fmt.Printf("%+v\n", c)
	u := bytes.NewReader(jsonValue)

	req, err := http.NewRequest("POST", url, u)

	if err != nil {
		fmt.Println("Error is req: ", err)
	}

	req.Header.Set("Content-Type", "application/json")

	cliente := &http.Client{}

	resp, err := cliente.Do(req)
	if err != nil {
		fmt.Println("error in send req: ", err.Error())
		w.WriteHeader(400)
	}

	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	//fmt.Println(string(bodyBytes))
	fmt.Fprintf(w, string(bodyBytes))

}

func main() {

	//================= NODE API =================//
	nodeip, defip := os.LookupEnv("NODEIP")
	nodeport, defport := os.LookupEnv("NODEPORT")

	if !defip {
		nodeip = "127.0.0.1"
	}

	if !defport {
		nodeport = "3000"
	}

	nodeURL = "http://" + nodeip + ":" + nodeport

	//================= NODE API2 =================//
	nodeip2, defip2 := os.LookupEnv("NODEIP2")
	nodeport2, defport2 := os.LookupEnv("NODEPORT2")

	if !defip2 {
		nodeip2 = "127.0.0.1"
	}

	if !defport2 {
		nodeport2 = "3001"
	}

	nodeURL2 = "http://" + nodeip2 + ":" + nodeport2

	//==================== GO ====================//
	ip, defip := os.LookupEnv("GOIP")
	port, defport := os.LookupEnv("GOPORT")

	if !defip {
		ip = "127.0.0.1"
	}

	if !defport {
		port = "4200"
	}

	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/js_files/", http.StripPrefix("/js_files/", http.FileServer(http.Dir("js_files/"))))
	//http.Handle("/reportes/dist/", http.StripPrefix("/reportes/dist/", http.FileServer(http.Dir("reportes/dist/"))))

	http.HandleFunc("/", index)
	http.HandleFunc("/proyecto2-compi1", index)
	http.HandleFunc("/proyecto2-compi1/errores", repErrores)
	http.HandleFunc("/proyecto2-compi1/erroresP", repErroresP)
	http.HandleFunc("/proyecto2-compi1/tokens", repTokens)
	http.HandleFunc("/proyecto2-compi1/tokensP", repTokensP)
	http.HandleFunc("/proyecto2-compi1/AST", arbol)
	http.HandleFunc("/proyecto2-compi1/ASTP", arbolP)
	http.HandleFunc("/proyecto2-compi1/generate", generate)
	http.HandleFunc("/proyecto2-compi1/generateP", generateP)
	http.HandleFunc("/proyecto2-compi1/generateError", generateError)
	http.HandleFunc("/proyecto2-compi1/generateErrorP", generateErrorP)
	http.HandleFunc("/proyecto2-compi1/generateToken", generateToken)
	http.HandleFunc("/proyecto2-compi1/generateTokenP", generateTokenP)
	http.HandleFunc("/proyecto2-compi1/traduceJS", traduceJS)
	http.HandleFunc("/proyecto2-compi1/traducePY", traducePY)
	http.HandleFunc("/proyecto2-compi1/analizarJS", analizarJS)
	http.HandleFunc("/proyecto2-compi1/analizarPY", analizarPY)

	fmt.Println("Escuchando por IP:" + ip + " PORT:" + port)

	http.ListenAndServe(":"+port, nil)
}
