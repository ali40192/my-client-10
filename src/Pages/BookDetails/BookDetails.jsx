import { div } from "framer-motion/client";
import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";

import Swal from "sweetalert2";
import CreateComment from "../../Components/Comments/CreateComment";
import GetComment from "../../Components/Comments/GetComment";
import AuthContext from "../../Contexts/AuthContext";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

const BookDetails = () => {
  const book = useLoaderData();
  const { title, author, summary, coverImage, _id } = book;
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/allbooks/${_id}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });

        navigate("/allbooks");
      }
    });
  };

  // comment display

  useEffect(() => {
    axios(`http://localhost:3000/getcomment?email=${user?.email}`).then(
      (data) => {
        setComment(data.data);
        setLoading(false);
      }
    );
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader></Loader>
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto">
      <div className="w-full bg-synthwave py-10">
        <div className="max-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border">
          <div className="md:flex">
            {/* --- Image Section --- */}
            <div className="md:w-1/3 w-full">
              <img
                src={coverImage}
                alt="Book"
                className="w-full h-full object-cover"
              />
            </div>

            {/* --- Content Section --- */}
            <div className="p-6 md:w-2/3">
              {/* Badge */}
              <div className="inline-block bg-[#1abc9c] text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">
                More About the Book
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>

              {/* Author */}
              <p className="text-lg text-[#e67e22] font-medium mb-4">
                by {author}
              </p>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">{summary}</p>

              {/* --- ACTION BUTTONS --- */}
              <div className="flex gap-4">
                {/* Update Button */}
                <Link
                  to={`/updatebook/${_id}`}
                  className="px-6 py-3 bg-[#1abc9c] text-white font-semibold text-sm rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
                >
                  Update
                </Link>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-[#e67e22] text-white font-semibold text-sm rounded-lg shadow hover:bg-red-700 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
              <div className="w-full flex justify-start my-3 ">
                {" "}
                <CreateComment></CreateComment>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-10 rounded-lg">
        <h1 className="text-2xl font-semibold">Comments</h1>
        <div className="grid grid-cols-1 gap-3  p-5 rounded-lg">
          {comment.map((single) => (
            <GetComment key={single._id} single={single}></GetComment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
