import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { initializeApp } from 'firebase/app';

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

// fetches google data from login
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
