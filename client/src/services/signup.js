import { place, sport, time } from "../components/PlacePop"
import socket from "../services/socket"
  
export function signupPlayer(){
    var signee = [localStorage.getItem("user"),place,sport,time,localStorage.getItem("id")];
    socket.emit('signup', signee);
}
  
export function unsignupPlayer(){
    var signee = [place,sport,time,localStorage.getItem("id")];
    socket.emit('unSignup', signee);
}