import socket from "../services/socket"
import '../scss/App.css';
import React, { useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signee(player){
    return (
      <div className="playerInfo" onClick={e=>{ socket.emit('getProfile', player.id); }}>
        <div className="text-center fw-bold playerName">{player.name}</div>
      </div>
    );
}