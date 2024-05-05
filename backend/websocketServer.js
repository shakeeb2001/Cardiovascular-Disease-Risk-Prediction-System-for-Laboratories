const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4001 });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received message:', message);

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.error('Error parsing JSON message:', error);
      return;
    }

    // Extract sender and receiver from the message
    const { sender, receiver } = parsedMessage;

    // Find the client corresponding to the receiver
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN && client.username === receiver) {
        // Send the message only to the receiver
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on port 4001');
