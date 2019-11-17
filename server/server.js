const express = require('express');
const http = require('http');
const WebSocket = require('websocket').server

const app = express();

const server = http.createServer(app)
// (req, res) => {
//   console.info("Received a request");
// })
// let connection;
const allConnections = [];

// app.use(req => req.json());
app.use(express.static(`${__dirname}/../build/`));
// (req, res) => {

// })

const ws = new WebSocket({httpServer: server});

ws.on('request', req => {
  const connection = req.accept(null, req.origin);
  connection.on('open', () => {console.log('CONNECTION OPEN')});
  allConnections.push(connection);
  connection.on('close', () => {console.log('CONNECTION CLOSED')});
  connection.on('message', (message) => {
    //add the logic to parse mesage
    console.log(`Server got a text: ${message.utf8Data}`);
    allConnections.forEach(connect => {connect.send(message.utf8Data)});
  });
})

const port = process.env.PORT || 5000;

server.listen(port, () => {console.log(`Server is listening on port ${port}`)});