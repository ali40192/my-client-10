const BookCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm max-w-sm mx-auto overflow-hidden w-full animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-36 sm:h-40 bg-gray-200"></div>

      {/* Content skeleton */}
      <div className="p-2 flex flex-col gap-1.5">
        {/* Title skeleton */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

        {/* Author skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/2 mt-0.5"></div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-0.5 mt-0.5">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-6 bg-gray-200 rounded w-full mt-2"></div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
