import React, { useState } from "react";
import "../../style/signup.css";
// import { Construction } from "lucide-react";
// import firebase from "firebase/compat/app";
// import {auth,provider} from '../../config/firebase.ts'
// import { useAuthState } from "react-firebase-hooks/auth";
// import 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [bio, Setbio] = useState("");
  const [profilepic, setProfilepic] = useState(null);
  const navigate=useNavigate()
  // const handlesubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         // Assuming you want to use email as userID
  //         const userId = email; // or any unique identifier
  //         await setDoc(doc(db, 'profiles', userId), {
  //             username: username,
  //             email: email,
  //             password: password,
  //             bio: bio,
  //             // profilepic: profilepic
  //         });
  //         console.log("Document written with ID: ", userId);
  //         console.log("Signed up! ", username);
  //     } catch (error) {
  //         alert(error);
  //     }
  // };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    try {
      await setDoc(doc(db, "users", user.uid), {
        username,
        bio,
        address,
        password,
        email: user.email,
        profilepic: user.photoURL,
        userID:user.uid
      });
      console.log("User information saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving user information:", error);
    }
  };

  return (
    <div className="signupContainer">
      <form className="signupForm">
        <input
          id="username"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          id="address"
          type="text"
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <input
          id="password"
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          id="bio"
          type="text"
          placeholder="bio"
          onChange={(e) => Setbio(e.target.value)}
        ></input>
        <input
          type="file"
          id="profilePicture"
          onChange={(e) => setProfilepic(e.target.files[0])}
        />

        <button type="submit" onClick={handlesubmit}>
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default Signup;
