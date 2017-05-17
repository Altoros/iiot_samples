var restify = require('restify');
var querystring = require('querystring');
var RandomStream = require('random-stream');

var r = RandomStream({min: 250, max: 1000});

var server = restify.createServer({name: 'MyApp'});
server.use(restify.bodyParser());

function send(req, res, next) {
  res.send('response');
  return next();
}

server.get('/posts', send);
server.get('/posts/:id', send);
server.post('/posts', function create(req, res, next) {
  res.send(201, req.params.title);
  return next();
});
server.put('/posts/:id', send);
server.patch('/posts/:id', send);
server.del('/posts/:id', function rm(req, res, next) {
  res.send(204);
  return next();
});
server.get('/search', function search(req, res, next) {
  var params = querystring.parse(req.url.split('?')[1]);
  res.send('search ' + params.q);
  return next();
});
server.get('/stream', function stream(req, res, next) {
  res.header('Content-Type', 'application/octet-stream');
  r.pipe(res);
  return next();
});

server.listen(8080);
