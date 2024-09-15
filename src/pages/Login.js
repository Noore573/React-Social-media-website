import React from "react";
import "../style/login.css"
import {auth,provider} from '../config/firebase.ts'
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";
function Login() {
    // after the login this will direct the user to homepage
    const navigate=useNavigate()
    const signInGoogle= async ()=>{

        const result=await signInWithPopup(auth,provider)
        console.log(result);
        navigate('/') //homepage
    }
    return (
        <div className="home">

            <input type="text" placeholder="username" ></input>
            <input type="text" placeholder="password"></input>

            <button>Login</button>
            <button onClick={signInGoogle}>Sign in with Google</button>
        </div>
    )
}
export default Login