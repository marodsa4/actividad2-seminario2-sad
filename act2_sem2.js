var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    // var fichero = 'HelloWorlxczcd.txt'; // para que salte error
    var fichero = 'HelloWorld.txt';

	fs.readFile(fichero, function (error, datos_fichero) {
        if (error) {
            response.write(error + "\n");
            response.end();
            console.log('Ha ocurrido un error: ' + error);
        }
        else {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(datos_fichero);
            console.log('Fichero leido correctamente');
        }
    });
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');
