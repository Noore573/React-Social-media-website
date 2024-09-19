import { useSelector } from "react-redux";
import "../../style/userprofile.css";
import { auth, db } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { getDoc, getDocs, query, where, doc } from "firebase/firestore";
const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [userinfo, setUserinfo] = useState([]);
  const GetUserinfo = async () => {
    console.log("haland", user.uid);
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      setUserinfo(userSnapshot.data());
      console.log("set!", userSnapshot.data());
      console.log("info: ", userinfo);
    } else {
      console.log("User not found");
    }
  };

  useEffect(() => {
    if (user) GetUserinfo(user);
  }, [user]);
  return (
    <div className="pcontainer">
      <div className="userprofileContainer">
        {/* <h1>User Profile</h1> */}
        {user && (
          <div>
            <img className="profilephoto" src={userinfo.profilepic}></img>
            <p>Name: {userinfo.username}</p>
            <p>bio: {userinfo.bio}</p>
            <p>Name: {userinfo.address}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserProfile;
