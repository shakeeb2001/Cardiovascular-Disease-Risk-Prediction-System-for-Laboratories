const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4001 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // Event listener for incoming messages from clients
  ws.on('message', function incoming(message) {
    console.log('Received message:', message);

    // Attempt to parse the incoming message as JSON
    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error('Error parsing JSON message:', error);
      return;
    }

    // Broadcast the received message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsedMessage)); // Ensure the message is sent as JSON
      }
    });
  });

  // Event listener for closing the connection
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on port 4001');
