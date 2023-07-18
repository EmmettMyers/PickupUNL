import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { io } from "socket.io-client";
import { home } from "..";

const socket = io.connect("http://localhost:5000");

// firebase configuration, can't show details
const firebaseConfig = {
  apiKey: " CANNOT SHOW ",
  authDomain: " CANNOT SHOW ",
  projectId: " CANNOT SHOW ",
  storageBucket: " CANNOT SHOW ",
  messagingSenderId: " CANNOT SHOW ",
  appId: " CANNOT SHOW ",
  measurementId: " CANNOT SHOW "
};
  
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export function signin(){
// fetches google data from login
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
