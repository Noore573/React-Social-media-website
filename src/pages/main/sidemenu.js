import React from "react";
import "../../style/sidemenu.css";
import { auth } from "../../config/firebase.ts";
import { signOut } from "firebase/auth";

const Sidemenu = () => {
  const Logout = async () => {
    console.log("ef");
    await signOut(auth);
  };
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
