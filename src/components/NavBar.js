import { Link } from "react-router-dom";
import React from "react";
import { auth } from "../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "../style/NavBar.css";
import facebooklogo from "../assets/facebook.png";
import facebooklogo2 from "../assets/b88519fb9b5d5ce25c0f2a73eab7810d.webp";

const NavBar = () => {
  const [user] = useAuthState(auth);
  const Logout = async () => {
    console.log("ef");
    await signOut(auth);
  };
  return (
    <div className="nav">
      {user ? (
        <div className="UserNav">
          {/* <p>{user?.displayName || ""}</p> */}

          <img src={user?.photoURL || ""}></img>

          {/* <button onClick={Logout}>Logout</button> */}
        </div>
      ) : (
        <div className="UserNav">
          <Link id="link" to="/login">
            Login{" "}
          </Link>
        </div>
      )}

      <div className="navigation">
        <Link id="link" to="/settings">
        <i class="fas fa-cog"></i>
        <div className="undertab"></div>
        </Link>
        <Link id="link" to="/profile">
        <i class="fas fa-user"></i>
        <div className="undertab"></div>
        </Link>
        <Link id="link" to="/media">
        <i class="fas fa-tv"></i>
        <div className="undertab"></div>
        </Link>
        <Link id="link" to="/">
          <i class="fas fa-home"></i>
          <div className="undertab"></div>
        </Link>
        {/* {!user ? (
          <Link id="link" to="/login">
            Login{" "}
          </Link>
        ) : (
          <Link id="link" to="/createpost">
            Create post{" "}
          </Link>
        )} */}
      </div>
      <div className="applogo">
        <img src={facebooklogo} />
      </div>
    </div>
  );
};

export default NavBar;
