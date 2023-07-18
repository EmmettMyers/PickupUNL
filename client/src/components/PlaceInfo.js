import socket from "../services/socket"
import '../scss/App.css';
import React, { useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { setSport, setTime } from "./PlacePop"
import Form from 'react-bootstrap/Form';

export default function PlaceInfo({ sports, facility, interact }){
    return (
      <div>
        <div className="tagHolder">
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
          <Form.Select className="me-3" onChange={e => { setSport(e.target.value); interact(); }} >
            <option value="">Sport</option>
              {sports.includes("Basketball") && <option value="basketball">Basketball</option>}
              {sports.includes("Volleyball") && <option value="volleyball">Volleyball</option>}
              {sports.includes("Soccer") && <option value="soccer">Soccer</option>}
              {sports.includes("Baseball") && <option value="baseball">Baseball</option>}
              {sports.includes("Football") && <option value="football">Football</option>}
              {sports.includes("Tennis") && <option value="tennis">Tennis</option>}
          </Form.Select>
          <Form.Select onChange={e => { setTime(e.target.value); interact(); }} >
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
      </div>
    );
}