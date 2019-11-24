const express = require('express');
const http = require('http');
const WebSocket = require('websocket').server

const app = express();

const server = http.createServer(app)
const allConnections = [];
const allMessages = [];

app.use(express.json());
app.use(express.static(`${__dirname}/../build/`));

const ws = new WebSocket({httpServer: server});

ws.on('request', req => {
  const connection = req.accept(null, req.origin);

  //define logic after opening the connection
  console.info('NEW CONNECTION OPEN');
  serverGreet(connection);
  //send last 10 messages
  let start = 0;
  if (allMessages.length - 9 > 0) {
    start = allMessages.length - 9;
  }
  for (let i = start; i < allMessages.length; i++){
    connection.send(JSON.stringify(allMessages[i]));
  }


  //define closing logic
  connection.on('close', () => {
    console.info("CONNECTION CLOSED");
    connection.send(JSON.stringify({"user":"Server", "server":true, "message":"Your session has ended!"}));
  });

  //add connection to all list
  allConnections.push(connection);
  connection.on('message', (message) => {
    const newMessage = JSON.parse(message.utf8Data);
    newMessage.time = new Date();
    allMessages.push(newMessage);
    // console.log(`Server got a text: ${message.utf8Data}`);
    allConnections.forEach(connect => {connect.send(JSON.stringify(newMessage))});
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {console.log(`Server is listening on port ${port}`)});

function serverGreet(connection) {
  connection.send(JSON.stringify({"user":"Server", "server":true, "message":"Welcome to the server!"}));
}