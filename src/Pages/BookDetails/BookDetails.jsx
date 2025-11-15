import React from "react";
import { Link, useLoaderData } from "react-router";

const BookDetails = () => {
  const book = useLoaderData();
  const { title, author, summary, coverImage, _id } = book;

  return (
    <div className="w-full bg-gray-300 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border">
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
            <div className="inline-block bg-orange-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-3">
              More About the Book
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>

            {/* Author */}
            <p className="text-lg text-orange-600 font-medium mb-4">
              by {author}
            </p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6">{summary}</p>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex gap-4">
              {/* Update Button */}
              <Link
                to={`/updatebook/${_id}`}
                className="px-6 py-3 bg-blue-600 text-white font-semibold text-sm rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
              >
                Update
              </Link>

              {/* Delete Button */}
              <button className="px-6 py-3 bg-red-600 text-white font-semibold text-sm rounded-lg shadow hover:bg-red-700 transition-all duration-300">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
