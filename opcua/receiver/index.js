var restify = require('restify');
var server = restify.createServer({name: 'MyApp'});
server.use(restify.bodyParser());

var Pool = require('pg').Pool;
var pool = new Pool({
  user: 'postgres',
  database: 'iot-book',
  password: 'password',
  host: 'host',
  port: 5433
});

//ensure table exists in db
pool.query('CREATE TABLE IF NOT EXISTS "sensor-logs" (id serial NOT NULL PRIMARY KEY, data json NOT NULL)', function (err, result) {
  if (err) console.log(err);
});

server.post('/', function create(req, res, next) {
  console.log(req.params);

  //save in db
  pool.query('INSERT INTO "sensor-logs" (data) VALUES ($1)', [req.params], function (err, result) {
    if (err) console.log(err);
    res.send(201, result);
  });

  return next();
});

server.get('/stats', function search(req, res, next) {
  pool.query('SELECT AVG("MyVariable1"), MAX("MyVariable1"), MIN("MyVariable1"), COUNT(*), SUM("MyVariable1") FROM (SELECT (data->>\'MyVariable1\')::int "MyVariable1" FROM "sensor-logs" ORDER BY id DESC LIMIT 10) data', function (err, result) {
    if (err) console.log(err);
    res.send(result.rows);
  });
  return next();
});

server.listen(process.env.PORT || 8080);
