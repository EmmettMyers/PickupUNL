import '../scss/App.css';
import React, { useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { updateSender, getSender } from "../services/messages"

export default function Message(chat){
    if (chat.sender == localStorage.getItem("user")){
        updateSender(chat.sender);
        return (
          <div className="myHolder"><div className="myChat">{chat.content}</div></div>
        );
      }
      else if (getSender() != chat.sender){
        updateSender(chat.sender);
        return (
          <div className="theirHolder">
            <div className="theirChatName">{chat.sender}</div>
            <div className="theirChat">{chat.content}</div>
          </div>
        );
      }
      updateSender(chat.sender);
      return (
        <div className="theirHolder">
          <div className="theirChat">{chat.content}</div>
        </div>
      );
}