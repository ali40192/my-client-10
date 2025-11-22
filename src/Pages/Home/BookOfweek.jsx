import React from "react";

const BookOfweek = () => {
  return (
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-7">
      <div class="bg-[#F0E491] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book1"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-[#31694E]">
            Fiction
          </h3>
        </div>
      </div>

      <div class="bg-[#F0E491] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book2"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-[#31694E]">
            Novel
          </h3>
        </div>
      </div>
      <div class="bg-[#F0E491] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book3"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-[#31694E]">
            Narrative
          </h3>
        </div>
      </div>
      <div class="bg-[#F0E491] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book4"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-[#31694E]">
            Historical Fiction
          </h3>
        </div>
      </div>
      <div class="bg-[#F0E491] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book5"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-[#31694E]">
            Genre fiction
          </h3>
        </div>
      </div>
      <div class="bg-[#F0E491] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-full">
        <img
          src="https://picsum.photos/400/550?book6"
          alt="Book Cover"
          class="w-full h-48  object-cover"
        />

        <div class="p-3 sm:p-4">
          <h3 class="text-base sm:text-lg font-semibold text-[#31694E]">
            Mystery
          </h3>
        </div>
      </div>
    </div>
  );
};

export default BookOfweek;
