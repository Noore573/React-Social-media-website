import React, { useState } from "react";
import "../../style/comments.css";
import profileimage from "../../assets/profile.jpg";
const CommentPopup = ({ comments, onAddComment, onClose }) => {
  const [commentText, setCommentText] = useState("");
  

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText); // Pass comment to parent component
      setCommentText("");
    }
  };
  const printComments = () => {  
    comments.map((com,index)=>{
      console.log("the com in comment:",com.comment);
    })
  };  
  printComments()

  return (
    <div className="comment-popup">
      <div className="comment-popup-content">
        <div className="Comments">
          {comments.map((comment, index) => (
            <div className="commentcontainer">
            <img src={profileimage}></img>
            <p key={index}>{comment.comment}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={commentText}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
          />
          <button type="submit">Post Comment</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentPopup;
