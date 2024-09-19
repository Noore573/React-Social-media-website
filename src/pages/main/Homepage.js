import React, { useEffect, useState } from "react";
import "../../style/Homepage.css";
import { getDocs, collection, doc,getDoc } from "firebase/firestore";
import { db } from "../../config/firebase.ts";
import Post from "./post.js";
import Sidemenu from "./sidemenu.js";
import News from "./news.js";
import { auth } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
const Homepage = () => {
  const postRef = collection(db, "Posts");
  const userRef=collection(db,"users")
  const [postlist, setpostlist] = useState([]);
  const [user] = useAuthState(auth);
  
  const GetPosts = async () => {
    console.log("User id: ",user.uid);
    const data = await getDocs(postRef);
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
    GetPosts();
  }, []);

  useEffect(() => {
    console.log("posts:", postlist); // This will log the updated postlist
  }, [postlist]); // This effect runs whenever postlist changes

  return (
    <div className="Homepage">
      <div className="sidemenu">
        <Sidemenu />
      </div>
      <div className="posts">
        {postlist.map((post) => (
          <Post key={post.id} post={post}  />
        ))}
      </div>
      <div className="news">
        <News />
      </div>
    </div>
  );
};

export default Homepage;