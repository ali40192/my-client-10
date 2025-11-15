import React from "react";

const Card = ({ book }) => {
  const { title, author, genre, rating, coverImage } = book;
  return (
    <div className="flex bg-gray-800 text-white rounded-lg shadow-lg max-w-sm mx-auto overflow-hidden hover:scale-105 duration-300 border border-b-gray-700">
      {/* --- Image Section (50% width) --- */}
      <div className="relative w-[50%] flex-shrink-0">
        <img
          className="h-full w-full object-cover"
          src={coverImage}
          alt="Book Cover"
        />

        {/* Genre Badge */}
        <div className="absolute top-0 left-0 bg-orange-600 text-white font-bold py-1 px-3 rounded-br-lg text-sm shadow-xl">
          {genre}
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          {/* Title */}
          <h3 className="text-lg font-bold leading-tight mb-1">{title}</h3>

          {/* Author */}
          <p className="text-sm text-orange-400 italic mb-2">by: {author}</p>

          {/* Genre */}
          <p className="text-xs text-gray-400 mb-2">Genre: {genre}</p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="text-green-500 text-lg mr-2">★★★★☆</div>
            <span className="text-gray-400 text-xs">{rating}</span>
          </div>
        </div>

        {/* Details Button */}
        <button className="mt-2 w-full bg-orange-600 hover:bg-orange-500 transition-all duration-300 text-white py-2 rounded-lg font-semibold shadow-md">
          Book Details
        </button>
      </div>
    </div>
  );
};

export default Card;
