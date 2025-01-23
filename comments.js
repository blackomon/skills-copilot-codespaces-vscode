// create web server with node.js
// import modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create server
http.createServer(function(request, response) {
    // parse request url
    var path = url.parse(request.url).pathname;
    // parse query string
    var query = qs.parse(url.parse(request.url).query);
    // process request
    switch (path) {
        case '/':
            // display form
            fs.readFile('comments.html', function(err, data) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write(data);
                response.end();
            });
            break;
        case '/submit':
            // process form
            var comment = query['comment'];
            fs.appendFile('comments.txt', comment + '\n', function(err) {
                response.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                response.write('<h1>Comment Received</h1>');
                response.end();
            });
            break;
        case '/list':
            // display comments
            fs.readFile('comments.txt', function(err, data) {
                response.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                response.write(data);
                response.end();
            });
            break;
        default:
            response.writeHead(404);
            response.write('404 Not Found');
            response.end();
            break;
    }
}).listen(8000); // listen on port 8000
console.log('Server is running at http://localhost:8000/');