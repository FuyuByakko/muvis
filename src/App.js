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
    const newConnection = new WebSocket('ws://192.168.1.15:5000');
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
          <input id="userName" placeholder="Enter Your User Name" onChange={(e) => {this.setState({user: e.target.value})}} />
          <input id="message" placeholder="Enter Your Message" onChange={(e) => {this.setState({text: e.target.value})}} /> 
          <button onClick={() => { 
            console.log(this.connection);
            this.connection.send(`'user':${this.state.user},'message':${this.state.text}`)
            }
          }> SEND </button>
      </div>
    );

  } 
}
