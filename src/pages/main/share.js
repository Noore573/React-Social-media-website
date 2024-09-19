import React from "react";
import "../../style/ShareSheet.css"

const ShareComponent = ({ postID, onClose }) => {
  const postLink = `https://react-social-media-d7aa7.web.app/viewpost/${postID}`;
  const CopyPostLink = () => {
      navigator.clipboard.writeText(postLink);
      alert(postLink);
      console.log(postID);

    onClose();
  };
  return (
    <div className="share-sheet">
      <div className="share-options">
        <button onClick={CopyPostLink}>Copy Link</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ShareComponent;
