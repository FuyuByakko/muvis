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

  handleMessageReceived = (message) => {
    this.setState({messages: [...this.state.messages, message.data]});
  }

  createConnection() {
    let port = process.env.PORT;
    let host = window.location.hostname
    const newConnection = new WebSocket(`ws://${host}:${port}`);
    newConnection.onmessage = this.handleMessageReceived;
    console.log("setting new connection");
    console.log(newConnection);
    return newConnection;
  }

  render() {
    return (
      <div className="App">
          <div id="messageBoard">
            <div className="message">
              {this.state.messages.map(message => <p>{message}</p>)}
            </div>
          </div>
          <div id="userInput">
            <input id="userName" placeholder="Enter Your User Name" onChange={(e) => {this.setState({user: e.target.value})}} />
            <input id="message" placeholder="Enter Your Message" onChange={(e) => {this.setState({text: e.target.value})}} /> 
            <button onClick={() => { 
              console.log(this.connection);
              this.connection.send(`'user':${this.state.user},'message':${this.state.text}`)
              }
            }> SEND </button>
          </div>
      </div>
    );

  } 
}
