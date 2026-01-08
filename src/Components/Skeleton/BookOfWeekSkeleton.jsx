const BookOfWeekSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-pulse">
      {/* Title skeleton */}
      <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
            {/* Genre icon skeleton */}
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>

            {/* Genre name skeleton */}
            <div className="h-5 bg-gray-200 rounded w-24 mx-auto mb-2"></div>

            {/* Description skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookOfWeekSkeleton;
