const BookDetailsSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="flex justify-center">
          <div className="w-80 h-96 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Details skeleton */}
        <div className="space-y-6">
          {/* Title */}
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>

          {/* Author */}
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>

          {/* Genre and Rating */}
          <div className="flex gap-4">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Additional info */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      {/* Comments section skeleton */}
      <div className="mt-12 space-y-6">
        <div className="h-6 bg-gray-200 rounded w-48"></div>

        {/* Comment form skeleton */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-20 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>

        {/* Comments list skeleton */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg border space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
