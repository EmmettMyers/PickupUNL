import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.css';
import Pop from './Pop';
import './menu';
import getUser from './firebase';
import './map';

if (getUser() === null || getUser() == ""){
  document.getElementById("login").style.display = "block"; 
}

function popup(facility){
  const popup = ReactDOM.createRoot(document.getElementById('popup'));
  popup.render(
    <React.StrictMode>
      <Pop 
        name={facility["name"]} 
        address={facility["address"]}
        inoutDoor={facility["inoutDoor"]}
        sports={facility["sports"]}
      />
    </React.StrictMode>
  );
}

export default popup;