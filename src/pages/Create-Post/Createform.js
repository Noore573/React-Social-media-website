import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { auth, db } from "../../config/firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import '../../style/Createpost.css'

const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("insert title please"),
    description: yup.string().required("insert description please"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const postsRef = collection(db, "Posts"); //a ref for the posts table
  const onCreatePost = async (data) => {
    console.log("🚀 ~ onCreatePost ~ data:", data);
    await addDoc(postsRef, {
      //   title: data.title,
      //   description: data.description,
      ...data, //this is the prev two line (using the spread op)
      username: user.displayName,
      userID: user.uid,
    });
    navigate("/"); //to go to the homepage after posting
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="title... " {...register("title")} />
      <p className="errorMsg">{errors.title?.message}</p>
      <textarea placeholder="description" {...register("description")} />
      <p className="errorMsg">{errors.description?.message}</p>
      <input type="submit" />
    </form>
  );
};

export default CreateForm;
