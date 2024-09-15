// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7-27tfdkabzagWU3OzMCeQzygm7rS5yU",
    authDomain: "react-social-media-d7aa7.firebaseapp.com",
    projectId: "react-social-media-d7aa7",
    storageBucket: "react-social-media-d7aa7.appspot.com",
    messagingSenderId: "34808641472",
    appId: "1:34808641472:web:a94d6724064103f86ffa25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) //this have all the userinfo btw
export const provider = new GoogleAuthProvider()
export const db=getFirestore(app)

