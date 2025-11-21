import React, { use } from "react";
import { Form } from "react-router";
import AuthContext from "../../Contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const CreateComment = () => {
  const { user } = use(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      photoURL: user.photoURL,
      displayName: user.displayName,
      userEmail: user.email,
      comment: e.target.comment.value,
    };
    console.log(commentData);

    axios
      .post("http://localhost:3000/cratecomment", commentData)
      .then((data) => {
        if (data.data.acknowledged) {
          toast.success("Comment Added Successfully");
          e.target.reset();
        }
      });
  };
  return (
    <div class="w-full  mx-auto">
      <div class="group border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition cursor-pointer">
        <p class="text-gray-500 group-hover:hidden">Write a comment...</p>
        <Form onSubmit={handleSubmit}>
          <div class="hidden group-hover:flex w-full items-center gap-2">
            <input
              name="comment"
              type="text"
              placeholder="Write a comment..."
              class="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Post
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateComment;
