import React, { useState, useEffect, } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase.ts";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "../../style/post.css";
import profileimage from "../../assets/profile.jpg";
import CommentPopup from "./comments.js"; 
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Share } from "lucide-react";
import ShareComponent from "./share.js";

const Media = (props) => {
  const {} = props;
  const navigate=useNavigate()
  const postRef = collection(db, "Posts");
  const userRef=collection(db,"users")
  const [postlist, setpostlist] = useState([]);

  const [user] = useAuthState(auth);
  const [likesammount, setlikeammounts] = useState(0);
  const [hasliked, sethasliked] = useState(false);
  const likeRef = collection(db, "likes"); //a ref for the likes table
  const likesDoc = query(likeRef, where("postID", "==", props.post.id)); //to show the likes of the post
  //dislike
  const [dislikesammount, setdislikeammounts] = useState(0);
  const [hasDisliked, sethasDisliked] = useState(false);
  const dislikeRef = collection(db, "dislikes");
  const dislikesDoc = query(dislikeRef, where("postID", "==", props.post.id));
  //comments
  const [comments, setComments] = useState([]);
  const [commentsammount, setCommentsammount] = useState(0);
  const commentRef = collection(db, "comments");
  const commentDoc = query(commentRef, where("postID", "==", props.post.id));

  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false); // State to manage comment pop-up visibility

  //share
  const [isShareSheetOpen,setisShareSheetOpen]=useState(false)

  const GetPostInfo = async () => {
    const likedata = await getDocs(likesDoc);
    setlikeammounts(likedata.docs.length);

    // checking if user has liked the post
    const userLiked = likedata.docs.some(
      (doc) => doc.data().userID === user.uid
    );
    sethasliked(userLiked);

    //getting the dislikes
    const dislikeData = await getDocs(dislikesDoc);
    setdislikeammounts(dislikeData.docs.length);
    const userdisliked = dislikeData.docs.some(
      (doc) => doc.data().userID === user.uid
    );
    sethasDisliked(userdisliked);

    //getting the comments
    const commentsData = await getDocs(commentDoc);
    setComments(commentsData.docs.map((doc) => doc.data()));
    // console.log("scom: ",commentsData.docs.map((doc) => doc.data()));
    // console.log("Comments: ", com);
    // comments.map((com,index)=>{
    //   console.log("the com",com.comment);
    // })
    setCommentsammount(commentsData.docs.length);
  };

  const LikePost = async () => {
    if (hasDisliked) {
      const userDislikeDoc = await getDocs(
        query(
          dislikeRef,
          where("postID", "==", props.post.id),
          where("userID", "==", user.uid)
        )
      );
      if (!userDislikeDoc.empty) {
        await deleteDoc(doc(db, "dislikes", userDislikeDoc.docs[0].id));
        setdislikeammounts(dislikesammount - 1);
        sethasDisliked(false);
      }
    }
    if (hasliked) {
      // remove the like btn
      const userLikeDoc = await getDocs(
        query(
          likeRef,
          where("postID", "==", props.post.id),
          where("userID", "==", user.uid)
        )
      );
      if (!userLikeDoc.empty) {
        await deleteDoc(doc(db, "likes", userLikeDoc.docs[0].id));
        setlikeammounts(likesammount - 1);
        sethasliked(false);
      }
    } else {
      // user hasn't liked the post
      await addDoc(likeRef, {
        userID: user.uid,
        postID: props.post.id,
      });
      setlikeammounts(likesammount + 1);
      sethasliked(true);
      removeDislikebtn();
    }
  };
  const removeDislikebtn = async () => {
    if (hasDisliked) {
      const userDislikeDoc = await getDocs(
        query(
          dislikeRef,
          where("postID", "==", props.post.id),
          where("userID", "==", user.uid)
        )
      );
      if (!userDislikeDoc.empty) {
        await deleteDoc(doc(db, "dislikes", userDislikeDoc.docs[0].id));
        setdislikeammounts(dislikesammount - 1);
        sethasDisliked(false);
        console.log("remove dislikebtn");
      }
    }
  };
  const removelikebtn = async () => {
    if (hasliked) {
      const userLikeDoc = await getDocs(
        query(
          likeRef,
          where("postID", "==", props.post.id),
          where("userID", "==", user.uid)
        )
      );
      if (!userLikeDoc.empty) {
        await deleteDoc(doc(db, "likes", userLikeDoc.docs[0].id));
        setlikeammounts(likesammount - 1);
        sethasliked(false);
        console.log("removed like btn");
      }
    }
  };
  const DislikePost = async () => {
    if (hasDisliked) {
      const userDislikeDoc = await getDocs(
        query(
          dislikeRef,
          where("postID", "==", props.post.id),
          where("userID", "==", user.uid)
        )
      );
      if (!userDislikeDoc.empty) {
        await deleteDoc(doc(db, "dislikes", userDislikeDoc.docs[0].id));
        setdislikeammounts(dislikesammount - 1);
        sethasDisliked(false);
      }
    } else {
      await addDoc(dislikeRef, {
        userID: user.uid,
        postID: props.post.id,
      });
      setdislikeammounts(dislikesammount + 1);
      sethasDisliked(true);
      removelikebtn();
    }
  };

  const Addcomment = async (commentText) => {
    try {
      await addDoc(commentRef, {
        userID: user.uid,
        postID: props.post.id,
        comment: commentText,
      });
    } catch (error) {
      console.log("Error comment:", error);
    }
    console.log("Added comment:", commentText);
    // Update comments state or fetch new comments after adding
    GetPostInfo();
    handleCloseCommentPopup();
  };

  const handleOpenCommentPopup = () => {
    setIsCommentPopupOpen(true);
  };

  const handleCloseCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };

  const navigateToProfile = (userId) => {
    navigate(`/viewprofile/${userId}`);
};
const GetPosts = async () => {
    console.log("User id: ",user.uid);
    console.log("here1");
    const data=query(postRef,where("media","!=",null))
    console.log("here2");
    data = await getDocs(postRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const postUser=await Promise.all(
      posts.map(async (post)=>{
        const userDoc = await getDoc(doc(db, `users/${post.userId}`));
      const user = userDoc.data();
      return { ...post, user };
      })
    )
  
    console.log("🚀 ~ GetPosts ~ data:", posts);
    setpostlist(posts);
  };
  useEffect(() => {
    GetPostInfo();
  }, [user]);
  useEffect(() => {
    GetPosts();
  }, []);
  const handleShare=async()=>{

  }
  const handleopenShareSheet=()=>{
    setisShareSheetOpen(true)
    console.log(props.post);
  }
  const handlecloseShareSheet=()=>{
    setisShareSheetOpen(false)
  }

  return (
    <div className="post">
      <div className="header">
        <div id="profileimage">
          {props.post.userPofilePic ? (
            <img src={props.post.userPofilePic} />
          ) : (
            <img src={profileimage} />
          )}
        </div>
        <div id="username" onClick={() => navigateToProfile(props.post.userID)}>
          <p>@{props.post.username} </p>
        </div>
      </div>
      <div className="details">
        <div id="title">
          <p>{props.post.title}</p>
        </div>
        <div id="description">
          <p>{props.post.description}</p>
        </div>
      </div>
      {props.post.media && (
        <div className="media">
          {props.post.media.includes("video") ? (
            <video controls src={props.post.media}>
              {/* <source  type="video/mp4" >Your browser does not support the video</source> */}
            </video>
          ) : (
            <img src={props.post.media} alt="image" />
          )}
        </div>
      )}
      <div className="postdetails"></div>
      <div className="undertab">
        <button
          id="like"
          onClick={LikePost}
          style={{ color: hasliked ? "blue" : "black" }}
        >
          <i className="fas fa-heart"></i>
          {likesammount != 0 && <p>{likesammount}</p>}
        </button>
        <button
          id="dislike"
          onClick={DislikePost}
          style={{ color: hasDisliked ? "red" : "black" }}
        >
          <i className="fas fa-thumbs-down"></i>
          {dislikesammount != 0 && <p>{dislikesammount}</p>}
        </button>
        <button id="comment" onClick={handleOpenCommentPopup}>
          <i className="fas fa-comment" />
          {commentsammount != 0 && <p>{commentsammount}</p>}
        </button>
        <button id="share" onClick={handleopenShareSheet}>
          <i className="fas fa-share"></i>
        </button>
        {isShareSheetOpen&&(
          <ShareComponent postID={props.post.postID} onClose={handlecloseShareSheet}> grgrg</ShareComponent>
        )}
      </div>
      {/* {isCommentPopupOpen && (
        <CommentPopup
          onAddComment={Addcomment}
          onClose={handleCloseCommentPopup}
        />
      )} */}
      {isCommentPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CommentPopup
              comments={comments} // Pass the comments list here
              onAddComment={Addcomment}
              onClose={handleCloseCommentPopup}
            />
          </div>
        </div>
      )}
    </div>

  );
};

export default Media;
