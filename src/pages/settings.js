import React from "react";
import { auth } from "../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "../style/settings.css"

const Settings = () => {
  const [user] = useAuthState(auth);
 

  // return (
  //   <div>
  //     <h1>setting page</h1>
  //     {!user ? (
  //       <div className="UserNav">
  //         <Link id="link" to="/login">
  //           Login{" "}
  //         </Link>
  //       </div>
  //     ) : (
  //       <button onClick={Logout}>Logout</button>
  //     )}
  //   </div>
  // );
  return(
    <div>  
            <div className="settingsContainer">  
                <button>  
                    Profile Settings  
                </button>  
                <button>  
                    Theme  
                </button>  
                <button>  
                    Privacy  
                </button>  
                <button>  
                    Notifications  
                </button>  
                <button>  
                    Account Management  
                </button>  
                <button>  
                    Language  
                </button>  
                <button>  
                    Help & Support  
                </button>  
            </div>  
        </div>  
  )
};

export default Settings;
