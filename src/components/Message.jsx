import React from 'react';
import './../css/Message.css';

export default class Message extends React.Component{
  constructor() {
    super()
    this.state = {
      receivedMessage: {},
      receivedMessageTime: ""
    }
  }

  parseInput = () => {
    const receivedMessage = JSON.parse(this.props.message);
    const timeStamp = receivedMessage.time.replace("T"," @ ").replace(/\.\d{3}Z$/, "");
    console.log(timeStamp);

    this.setState({
      receivedMessage: receivedMessage,
      receivedMessageTime: timeStamp,
    })
    this.props.scroll(this.props.refLink)
  }
  
  componentDidMount() {
    this.parseInput()
  }
  
  render() {
    return (
      <div className="message" ref={this.props.refLink}>
    { this.state.receivedMessage.server ? (
      <header className="userName server">{this.state.receivedMessage.user}</header>
      ) : (
        <header className="userName">{this.state.receivedMessage.user}</header>
        )}
      <main className="content display-linebreak">{`${this.state.receivedMessage.message}`}</main>
      <time className="postTime">{this.state.receivedMessageTime}</time>
    </div>
    )
  }
}