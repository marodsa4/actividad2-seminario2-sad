var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// Se utiliza los mimetypes de npm install mime-types
var mime = require('mime-types')

http.createServer(function (request, response) {
    // Recoger el fichero que se solicita
    var fichero = url.parse(request.url).pathname;
    // Los ficheros se guardan en la carpeta public
    var public = 'public';
    // Con process.cwd() se obtiene el directorio actual
    var directorio_actual = process.cwd();
    // Con path.join se unen los directorios para crear la ruta del fichero
    var ruta = path.join(directorio_actual, public, fichero);
    
    // Errores que puedan presentar al cargar ficheros
    // Código de respuesta 404
    // Código de respuesta 500  
    fs.stat(ruta, function(err, stats) {
        // Sin errores en stat
        if (err == null) {            
            // Cargar el fichero index.html si no se especifica ningún recurso concreto, es un directorio  
            if (stats.isDirectory()) {
                fichero = 'index.html';
            }            
            
            ruta = path.join(directorio_actual, public, fichero);
            console.log(ruta + fichero);
            
            // Extensión del fichero
            extension = path.extname(fichero);
            
            // Leer el fichero que se ha solicitado
            fs.readFile(ruta, function (error, datos_fichero) {
                // Si error -> Código de respuesta 500
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write('Error 500: ' + error + '\n');
                    response.end();
                    console.log('Error 500: ' + error+ '\n');
                }
                // No error -> fichero se lee correctamente
                else {                    
                    var mime_type = mime.contentType(extension);
                    response.writeHead(200, {'Content-Type': mime_type});
                    response.end(datos_fichero);
                    console.log('Fichero leido correctamente\n');
                }
            }); // fs.readFile

        }
        // Con errores en stat
        else {
            // Si fichero no existe -> Código de respuesta 404
            if (err = 'ENOENT') {
                response.writeHead(404, {'Content-Type': 'text/plain'}); 
                response.write('Error 404 - Recurso no encontrado\n');
                response.end();   
                console.log('Error 404 - Recurso no encontrado\n');
            }
            else {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write('Error 500: ' + err + '\n');
                response.end();
                console.log('Error 500: ' + err + '\n');
            }
        }
    }); // fs.stat
    
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
