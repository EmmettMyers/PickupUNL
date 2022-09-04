import './scss/App.css';
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { io } from "socket.io-client";
import getUser from './firebase';

const socket = io('ws://localhost:8080');

var place;
var sport;
var time;

// popup shown when point on map is clicked
function Pop(facility){
  
  place = facility.name;
  sport = ""; time = "";
  const [modalShow, setModalShow] = useState(true);
  const handleModalClose = () => setModalShow(false);
  const sports = facility.sports;

  return (
    <Modal dialogClassName="modal-width" centered show={modalShow} onHide={handleModalClose}>
      <Modal.Header id="modalTop" closeButton>
        <Modal.Title id="modalTitle" className="fw-bold">{facility.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between">
          <p className="info">{facility.inoutDoor}&emsp;&diams;&emsp;{facility.address}</p>
          <div className="sports">
            {sports.includes("Basketball") && <img id="basketball" src="https://www.freeiconspng.com/thumbs/basketball-png/basketball-png-19.png"></img>}
            {sports.includes("Volleyball") && <img id="volleyball" src="https://purepng.com/public/uploads/large/purepng.com-volleyballlarge-ballvolleyballgamessportsvolleyball-player-1701528201355vj4bx.png"></img>}
            {sports.includes("Soccer") && <img id="soccerball" src="https://freesvg.org/img/1546090478.png"></img>}
            {sports.includes("Baseball") && <img id="baseball" src="https://freepngclipart.com/download/baseball/34430-small-baseball-download-png.png"></img>}
            {sports.includes("Football") && <img id="football" src="https://cdn.pixabay.com/photo/2014/03/25/16/27/football-297151_960_720.png"></img>}
            {sports.includes("Tennis") && <img id="tennisball" src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3152199/tennis-ball-clipart-xl.png"></img>}
          </div>
        </div>
        <div className="mt-2 d-flex justify-content-between">
          <Form.Select className="me-3" onChange={e => { sport = e.target.value; showInteract(); }} >
            <option value="">Sport</option>
              {sports.includes("Basketball") && <option value="basketball">Basketball</option>}
              {sports.includes("Volleyball") && <option value="volleyball">Volleyball</option>}
              {sports.includes("Soccer") && <option value="soccer">Soccer</option>}
              {sports.includes("Baseball") && <option value="baseball">Baseball</option>}
              {sports.includes("Football") && <option value="football">Football</option>}
              {sports.includes("Tennis") && <option value="tennis">Tennis</option>}
          </Form.Select>
          <Form.Select onChange={e => { time = e.target.value; showInteract(); }} >
            <option value="">Time</option>
            <option value="7a">7:00 A.M.</option>
            <option value="8a">8:00 A.M.</option>
            <option value="9a">9:00 A.M.</option>
            <option value="10a">10:00 A.M.</option>
            <option value="11a">11:00 A.M.</option>
            <option value="12p">12:00 P.M.</option>
            <option value="1p">1:00 P.M.</option>
            <option value="2p">2:00 P.M.</option>
            <option value="3p">3:00 P.M.</option>
            <option value="4p">4:00 P.M.</option>
            <option value="5p">5:00 P.M.</option>
            <option value="6p">6:00 P.M.</option>
            <option value="7p">7:00 P.M.</option>
            <option value="8p">8:00 P.M.</option>
          </Form.Select>
        </div>
        <div id="interact">
        </div>
      </Modal.Body>
    </Modal>
  );

};;
               
// inserts signup page and chat into popup box
function showInteract(){
  const interact = ReactDOM.createRoot(document.getElementById('interact'));
  if (sport && time){
    interact.render(
      <div className="mt-4 mb-2 d-flex justify-content-between">
        <div className="rounded signupList">
          <div className="m-0 pt-2 pb-2 w-100 text-center h5 listTitle">Player List (<span id="playerNum"></span>)</div>
          <div id="signupArea">
            <div id="insertPlayers"></div>
          </div>
          <Button onClick={e=>{signupPlayer();}} className="position-absolute bottom-0 w-100 fw-bold signupBtn">Click here to signup</Button>
        </div>
        <div className="rounded chatRoom">
          <div className="m-0 pt-2 pb-2 w-100 text-center h5 chatTitle">Chat Room</div>
          <div id="chatArea">
            <div id="insertChats"></div>
          </div>
          <InputGroup className="position-absolute bottom-0 m-1">
            <Form.Control id="chatBox"/><Button onClick={e=>{sendChat();}} className="me-2 chatBtn">Send</Button>
          </InputGroup>
        </div>
      </div>
    );
    var setting = [place,sport,time];
    socket.emit('getChats', setting);
    socket.emit('getSignups', setting);
    setTimeout(function(){
      document.getElementById("lastChat").scrollIntoView(); // {behavior:'smooth'}
    }, 10);
  }
  else {
    interact.render();
  }
}

socket.on('signup', text => {
  var setting = [place,sport,time];
  socket.emit('getSignups', setting);
});

socket.on('getSignups', text => {
  var signup = JSON.parse(text);
  const signArea = ReactDOM.createRoot(document.getElementById('insertPlayers'));
  document.getElementById("playerNum").innerHTML = signup.length;
  signArea.render(
    <div>
      {signup && signup.map(player => <Signee name={player.user}/>)}
    </div>
  );
});

function Signee(player){
  return (
    <div className="playerInfo">
      <div className="text-center fw-bold playerName">{player.name}</div>
    </div>
  );
}

function signupPlayer(){
  var signee = [getUser(),place,sport,time];
  socket.emit('signup', signee);
}

var sender;

socket.on('message', text => {
  var setting = [place,sport,time];
  socket.emit('getChats', setting);
});

socket.on('getChats', text => {
  sender = "";
  var chats = JSON.parse(text);
  const chatArea = ReactDOM.createRoot(document.getElementById('insertChats'));
  chatArea.render(
    <div>
      {chats && chats.map(chat => <Message sender={chat.sender} content={chat.content}/>)}
      <div id="lastChat"></div>
    </div>
  );
});

function Message(chat){
  if (chat.sender == getUser()){
    sender = chat.sender;
    return (
      <div className="myHolder"><div className="myChat">{chat.content}</div></div>
    );
  }
  else if (sender != chat.sender){
    sender = chat.sender;
    return (
      <div className="theirHolder">
        <div className="theirChatName">{chat.sender}</div>
        <div className="theirChat">{chat.content}</div>
      </div>
    );
  }
  sender = chat.sender;
  return (
    <div className="theirHolder">
      <div className="theirChat">{chat.content}</div>
    </div>
  );
}

function sendChat(){
  var content = document.getElementById("chatBox").value;
  document.getElementById("chatBox").value = "";
  var chat = [getUser(),place,sport,time,content];
  socket.emit('message', chat);
}

export default Pop;
