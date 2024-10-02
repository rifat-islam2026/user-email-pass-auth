// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxaCNMoB_DLzetg0qBzibYmNAllg9yt4c",
    authDomain: "user-email-password-auth-1c38c.firebaseapp.com",
    projectId: "user-email-password-auth-1c38c",
    storageBucket: "user-email-password-auth-1c38c.appspot.com",
    messagingSenderId: "303257675881",
    appId: "1:303257675881:web:9bdfbd7ada51132bc45af8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;