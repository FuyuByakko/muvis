import React from 'react';
import './../css/Message.css';

export default function Message(props) {
  return (
  <div className="message">
    
    {props.message}
  </div>
  )
}