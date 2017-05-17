var request = require('request');

function cb(data) {
  console.log('received: ' + data);
}

request.get('http://127.0.0.1:8080/posts').on('response', function(res) {
  console.log(res.statusCode);
  console.log(res.headers);
  res.on('data', cb);
});

request.post('http://127.0.0.1:8080/posts', {form:{title:'new'}}).on('data', cb);

request.get('http://127.0.0.1:8080/search?q=query').on('data', cb);

request.get('http://127.0.0.1:8080/stream').on('response', function (res) {
  res.pipe(process.stdout);
});
