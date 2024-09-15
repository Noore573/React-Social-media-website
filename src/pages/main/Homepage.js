import React, { useEffect, useState } from "react";
import "../../style/Homepage.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase.ts";
import Post from "./post.js";
import Sidemenu from "./sidemenu.js";
import News from "./news.js";

const Homepage = () => {
  const postRef = collection(db, "Posts");
  const [postlist, setpostlist] = useState([]);

  const GetPosts = async () => {
    const data = await getDocs(postRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
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
          <Post key={post.id} post={post} />
        ))}
      </div>
      <div className="news">
        <News />
      </div>
    </div>
  );
};

export default Homepage;
