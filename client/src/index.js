import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.css';
import Pop from './Pop';
import './menu';
import './map';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { io } from "socket.io-client";
import schedule from 'node-schedule';

const socket = io.connect("http://localhost:5000");

 // reset at midnight
schedule.scheduleJob('0 0 * * *', () => { socket.emit('reset', ''); });

const firebaseConfig = {
  apiKey: "AIzaSyBzFgK46mm-ljicVeO1mzYfOOI_TnepNmg",
  authDomain: "pickupunl.firebaseapp.com",
  projectId: "pickupunl",
  storageBucket: "pickupunl.appspot.com",
  messagingSenderId: "836685069435",
  appId: "1:836685069435:web:2b9c8780182765e91636de",
  measurementId: "G-PTGQDDCKEE"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

document.getElementById("google").addEventListener("click", function() {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // uid, email, displayName, photoURL
        localStorage.setItem("user", result.user.displayName);
        localStorage.setItem("id", result.user.uid);
        document.getElementById("login").style.display = "none";
        var credentials = [result.user.uid,result.user.displayName,result.user.photoURL,result.user.email];
        socket.emit('createProfile', credentials); 
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

if (localStorage.getItem("user") === null || localStorage.getItem("user") == ""){
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