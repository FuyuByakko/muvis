import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.connection = this.createConnection();
    this.state = {
      connection: null,
      messages: [],
      text: "",
      user: "",
    }
  }

  dataIsValid = () => {
    return (this.state.user && this.state.text)
  }

  handleMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.data);
    this.setState({messages: [...this.state.messages, receivedMessage]});
  }

  handleMessageSend = () => {
    if (this.dataIsValid()) {
      this.connection.send(JSON.stringify({"user": this.state.user,"message": this.state.text}));
      console.info("MESSAGE SENT!");
    } else {
      console.info("Input Invalid. Message Not Sent!");
    }
  }

  createConnection() {
    let port = process.env.PORT;
    let host = window.location.host
    // const newConnection = new WebSocket(`wss://${host}`);
    const newConnection = new WebSocket("ws://localhost:5000");
    newConnection.onmessage = this.handleMessageReceived;
    console.info("CREATING NEW CONNECTION");
    return newConnection;
  }

  render() {
    return (
      <div className="App">
          <div id="messageBoard">
            {this.state.messages.map(message => <p>{message["message"]}</p>)}
          </div>
          <input
            id="userName"
            placeholder="Enter Your User Name"
            onChange={(e) => {this.setState({user: e.target.value})}}
          />
          <button id="reconnect" onClick={() => {this.createConnection()}}> Re-Connect </button>
          <input
            id="userMessage"
            placeholder="Enter Your Message"
            onChange={(e) => {this.setState({text: e.target.value})}}
            onKeyDown={(e) => {
              if(e.keyCode === 13) {
                this.handleMessageSend()
              }
            }}
          /> 
          <button id="sendMessage" onClick={() => {this.handleMessageSend()}}> SEND </button>
      </div>
    );

  } 
}
