import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { initializeApp } from 'firebase/app';

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
        localStorage.setItem("user", result.user.displayName);
        document.getElementById("login").style.display = "none"; 
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

function getUser(){
    return localStorage.getItem("user");
}

export default getUser;