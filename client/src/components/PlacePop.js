import '../scss/App.css';
import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { signupPlayer, unsignupPlayer } from "../services/signup"
import Signee from "./Signee.js";
import Message from "./Message.js";
import PlaceInfo from "./PlaceInfo.js";
import ProfileModal from "./ProfileModal.js";
import { sendChat, updateSender } from "../services/messages"
import socket from "../services/socket"

export let place;
export let sport;
export let time;

export function setPlace(newPlace) {
  place = newPlace;
}
export function setSport(newSport) {
  sport = newSport;
}
export function setTime(newTime) {
  time = newTime;
}

function PlacePop(facility){
    setPlace(facility.name);
    const [playerNum, setPlayerNum] = useState(0);
    const [signup, setSignup] = useState("");
    const [chats, setChats] = useState("");
    const [prof, setProf] = useState("");
    const [interact, setInteract] = useState(false);
    const [canSignup, setCanSignup] = useState(false);
    const [modalShow, setModalShow] = useState(true);
    const sports = facility.sports;

    function tryInteract(){
        if (sport && time)
          socket.emit('canSignup', [place, sport, time, localStorage.getItem('id')]);
    }
    function handleModalClose(){
      setSport("");
      setTime("");
      setPlace("");
      setModalShow(false);
    }

    socket.on('showInteract', canSignup => {
        if (canSignup == 'true')
            setCanSignup(true);
        else 
            setCanSignup(false);
        setInteract(true);
        var setting = [place,sport,time];
        socket.emit('getChats', setting);       
        socket.emit('getSignups', setting);
        setTimeout(function(){
          document.getElementById("lastChat").scrollIntoView(); // {behavior:'smooth'}
        }, 10);
    });
    socket.on('signup', text => {
      socket.emit('canSignup', [place, sport, time, localStorage.getItem('id')]);
    });
      
    socket.on('getSignups', text => {
        setSignup(JSON.parse(text));
        setPlayerNum(JSON.parse(text).length);
    });

    socket.on('message', text => {
        var setting = [place,sport,time];
        socket.emit('getChats', setting);
    });
    
    socket.on('getChats', text => {
        updateSender("");
        setChats(JSON.parse(text));
    });

    socket.on('showProfile', text => {
      setProf(JSON.parse(text));
    });

  return (
    <Modal dialogClassName="modal-width" centered show={modalShow} onHide={handleModalClose}>
      <Modal.Header id="modalTop" closeButton>
        <Modal.Title id="modalTitle" className="fw-bold">{facility.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <PlaceInfo sports={sports} facility={facility} interact={tryInteract} />
        { interact && 
            <div id="interact">
                <div className="mt-4 mb-2 d-flex justify-content-between">
                    <div className="rounded signupList">
                    <div className="m-0 pt-2 pb-2 w-100 text-center h5 listTitle">Player List ({playerNum})</div>
                    <div id="signupArea">
                        <div id="insertPlayers">
                            <div>
                              {signup && 
                              signup.map(player => <Signee name={player.user} id={player.id}/>)}
                            </div>
                        </div>
                    </div>
                    { canSignup 
                        ?
                        <Button 
                            onClick={e=>{signupPlayer();}} 
                            className="position-absolute bottom-0 w-100 fw-bold signupBtn">
                                Click to signup
                        </Button> 
                        :
                        <Button 
                            onClick={e=>{unsignupPlayer();}} 
                            className="position-absolute bottom-0 w-100 fw-bold unsignupBtn">
                                Click to remove signup
                        </Button>
                    }
                    </div>
                    <div className="rounded chatRoom">
                    <div className="m-0 pt-2 pb-2 w-100 text-center h5 chatTitle">Chat Room</div>
                    <div id="chatArea">
                        <div id="insertChats">
                          {chats 
                          && chats.map(chat => <Message sender={chat.sender} content={chat.content}/>)}
                        </div>
                    </div>
                    <InputGroup className="position-absolute bottom-0 m-1">
                        <Form.Control id="chatBox"/><Button onClick={e=>{sendChat();}} className="me-2 chatBtn">Send</Button>
                    </InputGroup>
                    </div>
                </div>
            </div>
        }
        <div id="insertProfile">
          {prof && 
            <ProfileModal prof={prof} hideProfile={() => setProf("")}/>
          }
        </div>
      </Modal.Body>
    </Modal>
  );

};;

export default PlacePop;