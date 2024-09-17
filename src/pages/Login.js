import React, { useState } from "react";
import "../style/login.css";
import { auth, provider, db } from "../config/firebase.ts";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc ,collection, query, where,getDocs } from "firebase/firestore";
function Login() {
  // after the login this will direct the user to homepage
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const user = result.user;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      navigate("/"); //homepage
    } else {
      navigate("/signup");
    }
  };
  const navSignup = () => {
    navigate("/signup");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("Invalid email or password");
      } else {
        // alert("Login successful!");
        console.log("Login successful!");
      }
    } catch (err) {
      console.log("Error logging in: " + err.message);
    }
  };
  return (
    <div className="home">
      <input
        id="email"
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        id="password"
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button onClick={handleLogin}>Login</button>
      <button onClick={signInGoogle}>Sign in with Google</button>
      <div className="createprofile">
        <p>new to the website?</p>
        <p id="cp" onClick={navSignup}>
          Sign up
        </p>
      </div>
    </div>
  );
}
export default Login;
