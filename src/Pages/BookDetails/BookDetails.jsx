import { use, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import CreateComment from "../../Components/Comments/CreateComment";
import GetComment from "../../Components/Comments/GetComment";
import AuthContext from "../../Contexts/AuthContext";
import axios from "axios";
import BookDetailsSkeleton from "../../Components/Skeleton/BookDetailsSkeleton";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const [comment, setComment] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // Fetch book details with React Query
  const {
    data: book,
    isLoading: bookLoading,
    error,
  } = useQuery({
    queryKey: ["bookDetails", id],
    queryFn: async () => {
      const response = await fetch(
        `https://assignment-10-server-three-kappa.vercel.app/allbooks/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch book details");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

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
        fetch(
          `https://assignment-10-server-three-kappa.vercel.app/allbooks/${book._id}`,
          {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          }
        )
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

  // Fetch comments
  useEffect(() => {
    if (user?.email) {
      axios(
        `https://assignment-10-server-three-kappa.vercel.app/getcomment?email=${user?.email}`
      ).then((data) => {
        setComment(data.data);
        setCommentsLoading(false);
      });
    }
  }, [user?.email]);

  // Show skeleton while loading
  if (bookLoading) {
    return <BookDetailsSkeleton />;
  }

  // Show error state
  if (error) {
    return (
      <div className="w-10/12 mx-auto py-10">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Error Loading Book
          </h2>
          <p className="text-gray-600">
            Failed to load book details. Please try again later.
          </p>
          <Link
            to="/allbooks"
            className="mt-4 inline-block px-6 py-2 bg-[#31694E] text-white rounded-lg hover:bg-[#84994F] transition-colors"
          >
            Back to All Books
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="w-10/12 mx-auto py-10">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-500 mb-4">
            Book Not Found
          </h2>
          <p className="text-gray-600">
            The requested book could not be found.
          </p>
          <Link
            to="/allbooks"
            className="mt-4 inline-block px-6 py-2 bg-[#31694E] text-white rounded-lg hover:bg-[#84994F] transition-colors"
          >
            Back to All Books
          </Link>
        </div>
      </div>
    );
  }

  const { title, author, summary, coverImage, _id } = book;

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
              <div className="inline-block bg-[#31694E] text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">
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
                  className="px-6 py-3 bg-[#31694E] text-white font-semibold text-sm rounded-lg shadow hover:bg-[#84994F] transition-all duration-300"
                >
                  Update
                </Link>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-[#A72703] text-white font-semibold text-sm rounded-lg shadow hover:bg-red-700 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
              <div className="w-full flex justify-start my-3">
                <CreateComment />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-[#F0E491] p-10 rounded-lg">
        <h1 className="text-2xl text-[#31694E] font-semibold">Comments</h1>
        <div className="grid grid-cols-1 gap-3 p-5 rounded-lg">
          {commentsLoading
            ? // Show skeleton for comments
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg border animate-pulse"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            : comment.map((single) => (
                <GetComment key={single._id} single={single} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
