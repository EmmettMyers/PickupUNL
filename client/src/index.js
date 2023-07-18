import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.css';
import './map';
import schedule from 'node-schedule';
import './services/authentication';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Profile from './components/Profile';
import PlacePop from './components/PlacePop';
import socket from "./services/socket"

const root = ReactDOM.createRoot(document.getElementById('root'));

// reset at midnight
schedule.scheduleJob('0 0 * * *', () => { socket.emit('reset', ''); });

export function home(navigation){
  if (localStorage.getItem("user") === null || localStorage.getItem("user") == ""){
    root.render(
      <React.StrictMode>
        <Login />
      </React.StrictMode>
    );
  } else {
    if (navigation == "search"){
      root.render(
        <React.StrictMode>
          <Navbar home={home} />
          <Search close={home} />
        </React.StrictMode>
      );
    } else if (navigation == "profile"){
      root.render(
        <React.StrictMode>
          <Navbar home={home} />
          <Profile close={home} />
        </React.StrictMode>
      );
    } else if (navigation == "logout"){
      localStorage.setItem("user", "");
      root.render(
        <React.StrictMode>
          <Login />
        </React.StrictMode>
      );
    } else {
      root.render(
        <React.StrictMode>
          <Navbar home={home} />
        </React.StrictMode>
      );
    }
  }
}

<<<<<<< HEAD
home();

=======
// calls Pop component to display popup for facility clicked
>>>>>>> 2cafdaf8c2dd0966f6f4257b731e344d99780688
function popup(facility){
  const popup = ReactDOM.createRoot(document.getElementById('popup'));
  popup.render(
    <React.StrictMode>
      <PlacePop 
        name={facility["name"]} 
        address={facility["address"]}
        inoutDoor={facility["inoutDoor"]}
        sports={facility["sports"]}
      />
    </React.StrictMode>
  );
}

export default popup;
