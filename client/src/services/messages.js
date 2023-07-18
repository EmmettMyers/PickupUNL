import '../scss/App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import socket from "../services/socket"
import { place, sport, time } from "../components/PlacePop"

var sender = "";

export function updateSender(newSender) {
  sender = newSender;
}

export function getSender() {
  return sender;
}

export function sendChat(){
  var content = document.getElementById("chatBox").value;
  document.getElementById("chatBox").value = "";
  var chat = [localStorage.getItem("user"),place,sport,time,content];
  socket.emit('message', chat);
}