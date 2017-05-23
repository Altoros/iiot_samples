var http = require('http');
var querystring = require('querystring');

http.createServer(function (req, res) {
  req.on('data', chunk => {
    var data = querystring.parse(chunk.toString());
    console.log(data);
  });
  req.on('end', () => {
    res.writeHead(200, 'OK', {'Content-Type': 'text/html'})
    res.end('Data received.')
  });
}).listen(8080);
