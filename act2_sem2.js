var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function (request, response) {
    // Recoger el fichero que se solicita
    var fichero = url.parse(request.url).pathname;
    // Los ficheros se guardan en la carpeta public
    var public = 'public';
    // Con process.cwd() se obtiene el directorio actual
    var directorio_actual = process.cwd();
    // Con path.join se unen los directorios para crear la ruta del fichero
    var ruta = path.join(directorio_actual, public, fichero);

    // Leer el fichero que se ha solicitado
	fs.readFile(ruta, function (error, datos_fichero) {
        if (error) {
            response.write(error + "\n");
            response.end();
            console.log('Ha ocurrido un error: ' + error);
        }
        else {
            response.writeHead(200, {'Content-Type': 'text/plain'}); // TO-DO
            response.end(datos_fichero);
            console.log('Fichero leido correctamente');
        }
    });
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
