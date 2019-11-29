import React from 'react';
import './css/App.css';
import logo from './assets/logo_title.png';
import qrCode from './assets/muvis-chat.png';
import Message from './components/Message'

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
  
  render() {
    return (
      <div className="App">
        <img id="logo" src={logo} alt="The logo for MUVIS" />
        <img id="qr-code" src={qrCode} alt="qr code link for MUVIS" />
        <header className="greet-text">
          Welcome to MUVIS!<br/>
          Please find more info at my <a href="" target="_blank">GitHub</a>!<br />
          You can scan the QR code below to open the app on the phone.<br />
          <br />
          Please don't hesitate to contact me with suggestions, comments or just for a chat!<br />
          <br />
          Have a nice day and enjoy the chat!
        </header>
        <header className="greet-text short">
          Welcome to MUVIS!<br/>
          Please find more info at my <a href="" target="_blank">GitHub</a>!<br />
          Please don't hesitate to contact me with suggestions, comments or just for a chat!<br />
          Have a nice day and enjoy the chat!
        </header>
        <div id="messageBoard">
          {this.state.messages.map(message => <Message message={message} key={message.time}/>)}
        </div>
        <input
          id="userNameInput"
          type="text"
          placeholder="Enter Your User Name"
          onChange={(e) => {this.setState({user: e.target.value})}}
        />
        <button id="reconnect" onClick={() => {this.createConnection()}}> Re-Connect </button>
        <textarea
          id="userMessageInput"
          placeholder="Enter Your Message"
          value={this.state.text}
          onChange={(e) => {this.setState({text: e.target.value})}}
          onKeyDown={(e) => {
            if(e.keyCode === 13 && !(e.shiftKey)) {
              this.handleMessageSend();
            }
          }}
        /> 
        <button id="sendMessage" onClick={() => {this.handleMessageSend()}}> SEND </button>
      </div>
    );
  } 

  dataIsValid = () => {
    return (this.state.user && this.state.text)
  }

  handleMessageReceived = (message) => {
    if (message)
    this.setState({messages: [...this.state.messages, message.data]});
  }

  handleMessageSend = () => {
    if (this.dataIsValid()) {
      this.connection.send(JSON.stringify({"user": this.state.user,"message": this.state.text}));
      console.info("MESSAGE SENT!");
      this.setState({text: ""})
    } else {
      console.info("Input Invalid. Message Not Sent!");
    }
  }

  createConnection() {
    // let port = process.env.PORT;
    let host = window.location.host
    console.info("CREATING NEW CONNECTION");
    // const newConnection = new WebSocket(`wss://${host}`);
    const newConnection = new WebSocket("ws://localhost:5000");
    newConnection.onmessage = this.handleMessageReceived;
    return newConnection;
  }
}
