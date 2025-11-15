import React from "react";

const BooksWeek = () => {
  return (
    <div className=" bg-white shadow-xl rounded-2xl overflow-hidden border">
      <div className="md:flex">
        <div className="md:w-[50%] w-full">
          <img
            src="https://picsum.photos/400/550?book"
            alt="Book of the Week"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:w-2/3">
          <div className="inline-block bg-orange-600 text-white text-md font-bold px-4 py-1 rounded-full mb-3">
            ⭐ Book of the Week
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            The Eternal Whisper
          </h2>

          <p className="text-lg text-orange-600 font-medium mb-4">
            by Aria Lennox
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            A breathtaking journey through forgotten lands, ancient secrets, and
            the unbreakable bond between courage and destiny. This book blends
            adventure, emotion, and mystery in a way that keeps readers hooked
            till the very last page.
          </p>

          <button className="px-6 py-3 bg-orange-600 text-white font-semibold text-sm rounded-lg shadow hover:bg-orange-700 transition-all duration-300">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksWeek;
