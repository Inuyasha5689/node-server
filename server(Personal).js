var http = require('http'),
    fs = require('fs'),
    path = require('path');

var hostname = '10.0.0.15';
var port = 25565;

var server = http.createServer(function(req,res){
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method == 'GET') {
        var fileUrl;

        if(req.url == '/') fileUrl='/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public'+fileUrl);
        var fileExt = path.extname(filePath);

        if (fileExt == '.html') {
            fs.exists(filePath, function(exists) {

                if(!exists) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream(filePath).pipe(res);

            });
        }
        else if (fileExt == '.css') {
            fs.exists(filePath, function(exists) {

                if(!exists) {
                    res.writeHead(404, {'Content-Type': 'text/css'});
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/css'});
                fs.createReadStream(filePath).pipe(res);

            });
        }
        else if (fileExt == '.js') {
            fs.exists(filePath, function(exists) {

                if(!exists) {
                    res.writeHead(404, {'Content-Type': 'text/javascript'});
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/javascript'});
                fs.createReadStream(filePath).pipe(res);

            });
        }
        else if (fileExt == '.otf' || fileExt == '.eot' || fileExt == '.svg' || fileExt == '.ttf' || fileExt == '.woff' || fileExt == '.woff2'){
            fs.exists(filePath, function(exists) {

                if(!exists) {
                    res.writeHead(404, {'Content-Type': 'text/font'});
                    res.end('<h1>Error 404: ' + fileUrl + ' not found</h1>');
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/font'});
                fs.createReadStream(filePath).pipe(res);

            });
        }
    }
    else{
        res.writeHead(404,{'Content-Type': 'text/html'});
        res.end('<h1>Error 404: ' + req.method + ' not supported</h1>');
    }
});

server.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});
