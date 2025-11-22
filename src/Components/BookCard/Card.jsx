import React from "react";
import { Link } from "react-router";

const Card = ({ book }) => {
  const { title, author, genre, rating, coverImage, _id } = book;

  return (
    <div className="flex bg-[#31694E] text-white rounded-lg shadow-lg max-w-sm mx-auto overflow-hidden hover:scale-105 duration-300 border border-b-gray-700">
      {/* --- Image Section (50% width) --- */}
      <div className="relative w-[50%] ">
        <img
          className="h-full w-full object-cover"
          src={coverImage}
          alt="Book Cover"
        />

        {/* Genre Badge */}
        <div className="absolute top-0 left-0 bg-[#F0E491] text-[#31694E] font-bold py-1 px-3 rounded-br-lg text-sm shadow-xl">
          {genre}
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 flex flex-col justify-between ">
        <div>
          {/* Title */}
          <h3 className="text-lg font-bold leading-tight mb-1">{title}</h3>

          {/* Author */}
          <p className="text-sm text-amber-400 italic mb-2">By {author}</p>

          {/* Genre */}
          <p className="text-xs text-black font-bold mb-2">Genre: {genre}</p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="text-amber-400 text-lg mr-2">★★★★☆</div>
            <span className="text-black font-bold text-xs">{rating}</span>
          </div>
        </div>

        {/* Details Button */}
        <Link
          to={`/bookdetails/${_id}`}
          className="mt-2 w-full  hover:bg-amber-200 transition-all duration-300 bg-[#F0E491] text-[#31694E] p-2 rounded-lg font-semibold shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
