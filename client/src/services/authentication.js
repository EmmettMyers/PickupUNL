import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { io } from "socket.io-client";
import { home } from "..";

const socket = io.connect("http://localhost:5000");

// firebase configuration, can't show details
const firebaseConfig = {
<<<<<<< HEAD:client/src/services/authentication.js
    apiKey: "AIzaSyBzFgK46mm-ljicVeO1mzYfOOI_TnepNmg",
    authDomain: "pickupunl.firebaseapp.com",
    projectId: "pickupunl",
    storageBucket: "pickupunl.appspot.com",
    messagingSenderId: "836685069435",
    appId: "1:836685069435:web:2b9c8780182765e91636de",
    measurementId: "G-PTGQDDCKEE"
=======
  apiKey: " CANNOT SHOW ",
  authDomain: " CANNOT SHOW ",
  projectId: " CANNOT SHOW ",
  storageBucket: " CANNOT SHOW ",
  messagingSenderId: " CANNOT SHOW ",
  appId: " CANNOT SHOW ",
  measurementId: " CANNOT SHOW "
>>>>>>> 2cafdaf8c2dd0966f6f4257b731e344d99780688:client/src/firebase.js
};
  
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

<<<<<<< HEAD:client/src/services/authentication.js
export function signin(){
=======
// fetches google data from login
document.getElementById("google").addEventListener("click", function() {
>>>>>>> 2cafdaf8c2dd0966f6f4257b731e344d99780688:client/src/firebase.js
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // uid, email, displayName, photoURL
        localStorage.setItem("user", result.user.displayName);
        localStorage.setItem("id", result.user.uid);
        home();
        var credentials = [result.user.uid,result.user.displayName,result.user.photoURL,result.user.email];
        socket.emit('createProfile', credentials); 
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}
<<<<<<< HEAD:client/src/services/authentication.js
=======

export default getUser;
>>>>>>> 2cafdaf8c2dd0966f6f4257b731e344d99780688:client/src/firebase.js
