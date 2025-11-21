import React from "react";

const GetComment = ({ single }) => {
  return (
    <div class="w-full  bg-white border rounded-lg p-3 shadow-sm">
      <div class="flex items-start gap-3">
        <img
          src={single.photoURL}
          alt="Profile"
          class="w-9 h-9 rounded-full object-cover"
        />

        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-800 leading-tight">
            {single.displayName}
          </h3>

          <p class="text-xs text-gray-600 mt-1 leading-relaxed">
            {single.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetComment;
