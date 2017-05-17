const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }, function () {
  console.log('Websocket server started');
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    // Broadcast to everyone else
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send('new client connected');
      }
    });
  });

  // Send message to connected client
  ws.send('hello, client');
});
