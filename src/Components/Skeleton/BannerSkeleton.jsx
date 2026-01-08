const BannerSkeleton = () => {
  return (
    <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-200 rounded-lg animate-pulse relative overflow-hidden">
      {/* Background shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>

      {/* Content overlay skeleton */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4 p-6">
          {/* Title skeleton */}
          <div className="h-8 md:h-12 bg-gray-300 rounded w-80 mx-auto"></div>

          {/* Subtitle skeleton */}
          <div className="h-4 md:h-6 bg-gray-300 rounded w-64 mx-auto"></div>

          {/* Button skeleton */}
          <div className="h-10 md:h-12 bg-gray-300 rounded w-32 mx-auto mt-6"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
