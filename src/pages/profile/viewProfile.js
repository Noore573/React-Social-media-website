import "../../style/userprofile.css";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase.ts";
import { useParams } from "react-router-dom";

const ViewProfile = () => {
    const [otherUserInfo, setOtherUserInfo] = useState([]);
    const { userID } = useParams();

    const viewUserProfile = async (userID) => {
        console.log("Viewing user with ID:", userID); 

        try {
            const viewUserRef = doc(db, "users", userID);
            const viewedUser = await getDoc(viewUserRef);

            if (viewedUser.exists()) {
                setOtherUserInfo(viewedUser.data());
                console.log("set",viewedUser.data());
                console.log("User Info Set:", otherUserInfo);
            } else {
                console.log("User not found");
            }
        } catch (error) {
            console.error("Error fetching user information:", error);
        }
    };

    useEffect(() => {
        console.log("Effect triggered with userID:", userID);
        if (userID) {
            console.log("Calling viewUserProfile function");
            viewUserProfile(userID);
        }
    }, [userID]);

    return (
        <div className="pcontainer">
          <div className="userprofileContainer">
            {otherUserInfo && (
              <div>
                <img className="profilephoto" src={otherUserInfo.profilepic}></img>
                <p>Name: {otherUserInfo.username}</p>
                <p>bio: {otherUserInfo.bio}</p>
                <p>Name: {otherUserInfo.address}</p>
              </div>
            )}
          </div>
        </div>
      );
};


export default ViewProfile;