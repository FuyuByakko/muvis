import React from 'react';
import './../css/Message.css';

export default function Message(props) {
  const receivedMessage = JSON.parse(props.message);

  return (
  <div className="message">
    { receivedMessage.server ? (
      <header className="userName server">{receivedMessage.user}</header>
    ) : (
      <header className="userName">{receivedMessage.user}</header>
    )}
    <main className="content">{receivedMessage.message}</main>
    <time className="postTime">{receivedMessage.time}</time>
  </div>
  )
}