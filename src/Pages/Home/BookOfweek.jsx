import React from "react";

const BookOfweek = () => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book1"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800">
            The Boy in The Book
          </h3>

          <p class="text-xs sm:text-sm text-gray-500 mt-1">By Danny Lotlight</p>

          <div class="mt-3 flex justify-between items-center">
            <span class="text-xs sm:text-sm font-medium text-gray-700">
              Ebook
            </span>

            <button class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-700">
              Read Now
            </button>
          </div>
        </div>
      </div>
      {/* //card 2// */}
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book2"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800">
            A fox
          </h3>

          <p class="text-xs sm:text-sm text-gray-500 mt-1">By Tom Hangton</p>

          <div class="mt-3 flex justify-between items-center">
            <span class="text-xs sm:text-sm font-medium text-gray-700">
              Ebook
            </span>

            <button class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-700">
              Read Now
            </button>
          </div>
        </div>
      </div>
      {/* ///card 3// */}
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book3"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800">
            Who Will Win
          </h3>

          <p class="text-xs sm:text-sm text-gray-500 mt-1">By Nf Clay</p>

          <div class="mt-3 flex justify-between items-center">
            <span class="text-xs sm:text-sm font-medium text-gray-700">
              Ebook
            </span>

            <button class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-700">
              Read Now
            </button>
          </div>
        </div>
      </div>
      {/* ///card 4// */}
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book4"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800">
            Earthly Tales
          </h3>

          <p class="text-xs sm:text-sm text-gray-500 mt-1">By Lotlight</p>

          <div class="mt-3 flex justify-between items-center">
            <span class="text-xs sm:text-sm font-medium text-gray-700">
              Ebook
            </span>

            <button class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-700">
              Read Now
            </button>
          </div>
        </div>
      </div>
      {/* ///card 5// */}
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book5"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-gray-800">
            Young Minds
          </h3>

          <p class="text-xs sm:text-sm text-gray-500 mt-1">By Ragon</p>

          <div class="mt-3 flex justify-between items-center">
            <span class="text-xs sm:text-sm font-medium text-gray-700">
              Ebook
            </span>

            <button class="px-2 py-1 sm:px-3 sm:py-1 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-700">
              Read Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOfweek;
