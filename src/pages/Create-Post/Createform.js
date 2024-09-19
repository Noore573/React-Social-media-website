import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection,updateDoc,doc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { auth, db, storage } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../../style/Createpost.css";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from "uuid";
import { Medal } from "lucide-react";

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const schema = yup.object().shape({
    title: yup.string().required("Insert title please"),
    description: yup.string().required("Insert description please"),
    media: yup.mixed(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const postsRef = collection(db, "Posts");

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setMedia(file);
    setValue("media", file);
  };

  const handleUploadAndCreatePost = async (data) => {
    console.log("Creating post ");
    try {
      // console.log(media.name);
      if (media.name.includes(".mp4")) {
        var storageRef = ref(storage, `media/video/${v4()}`);
      } else {
        var storageRef = ref(storage, `media/image/${v4()}`);
      }
      await uploadBytes(storageRef, media);
      const mediaUrl = await getDownloadURL(storageRef);

      const docRef = await addDoc(postsRef, {
        ...data,
        username: user.displayName,
        userID: user.uid,
        userPofilePic: user.photoURL,
        media: media != null ? mediaUrl : null,
        postID: "",
      });
      const postDocRef = doc(db, "Posts", docRef.id);

      // Now we can update the document with the actual postID
      await updateDoc(postDocRef, {
        postID: docRef.id, // Update the document with the generated doc ID
      });

      console.log("created: ", docRef.id);

      navigate("/");
    } catch (error) {
      console.error("Error uploading media or creating post: ", error);
    }
  };

  return (
    <form
      className="createform"
      onSubmit={handleSubmit(handleUploadAndCreatePost)}
    >
      <input id="title" placeholder="Title..." {...register("title")} />
      <p className="errorMsg">{errors.title?.message}</p>
      <textarea placeholder="Description" {...register("description")} />
      <p className="errorMsg">{errors.description?.message}</p>
      <input
        type="file"
        accept="image/jpeg, video/*"
        onChange={handleMediaChange}
      />
      <p className="errorMsg">{errors.media?.message}</p>
      <input type="submit" value="Create Post" />
    </form>
  );
};

export default CreateForm;
