# Universidad de San Carlos de Guatemala
# Compiladores 2
## Proyecto 1

## Mario Obed Morales Guitz
## Carlos Rene Orantes Lara
## Kevin Eduardo Estrada Martínez

## Desarrollado con

- CodeMirror: librería javascript para implementar un editor de texto en un sitio web. Uso bajo licencia MIT.

## TYPESCRIPT 
#### Configuraciones de typescript
Para crear(si no existe) el archivo 'tsconfig.json' Utilizar el comando 'tsc --init'
* Adentro del archivo creado, descomentar la linea "outDir:<nombre>" y sustituir 'nombre' por dist para crear una unica carpeta que contenga todo el codigo convertido de .TS -> .JS. En nuestro caso se le coloco 'dist'.

## JAVASCRIPT
#### Configuraciones de javascript 
Crear el package.json ejecutando el comando npm init. 
* Agregar a scripts el comando build y start, para convertir TSC -> JS, construir la gramatica y ejecutar node index.js.
* Para importar un archivo .js adentro de un archivo .TS utilizar el siguiente comando "npm i --save-dev @types/node" -> acualiza el package.json

## Licencia

MIT