import React from "react";
import "../../style/sidemenu.css";
import { auth } from "../../config/firebase.ts";
import { signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom"

const Sidemenu = () => {
  const navigate=useNavigate()
  const Logout = async () => {
    console.log("ef");
    await signOut(auth);
  };
  const handlePost=()=>{
    navigate("/createpost")
  }
  return (
    <div className="sidemenubtns">
      <div className="essentials">
        <button id="friends">Friends</button>
        <button id="groups">Groups</button>
        <button id="saved-posts">Saved Posts</button>
        <button id="events">Events</button>
        <button id="discover">Discover</button>
        <button id="feedback">Feedback</button>
        <button id="trending">Trending</button>
      </div>
      <div className="teq">
      <button id="createpost" onClick={handlePost}>
          Post
        </button>
        <button id="help">
          Help
        </button>
        <button id="logout" onClick={Logout} >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidemenu;
