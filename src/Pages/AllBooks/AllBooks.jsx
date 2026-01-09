import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../../Components/BookCard/Card";
import BookCardSkeleton from "../../Components/Skeleton/BookCardSkeleton";

const AllBooks = () => {
  const [sort, setSort] = useState("none");

  // Fetch all books with React Query
  const {
    data: allbooks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/allbooks`);
      if (!response.ok) {
        console.error(
          `Failed to fetch all books: ${response.status} ${response.statusText}`
        );
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      // Handle both array response and paginated response
      return Array.isArray(data) ? data : data.books || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const sortItem = (() => {
    if (!allbooks) return [];
    if (sort === "asc") {
      return [...allbooks].sort((a, b) => a.rating - b.rating);
    }
    if (sort === "desc") {
      return [...allbooks].sort((a, b) => b.rating - a.rating);
    }
    return allbooks;
  })();

  if (error) {
    return (
      <div className="w-[80%] mx-auto my-25">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Error Loading Books
          </h2>
          <p className="text-gray-600">
            Failed to load books. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80%] mx-auto my-25">
      <div className="text-center border border-b-[#F0E491] p-4 w-[40%] mx-auto rounded-3xl">
        <h1 className="text-3xl font-bold text-[#31694E]">All Books</h1>
      </div>

      <div className="flex justify-between my-8">
        <h1 className="font-bold text-xl text-[#31694E]">
          Number of Books{" "}
          <span className="text-xs font-normal text-gray-500">
            {isLoading ? "(Loading...)" : `(${allbooks?.length || 0})`}
          </span>
        </h1>
        <label className="form-control">
          <select
            className="select select-bordered select-sm select-primary w-full max-w-xs"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            disabled={isLoading}
          >
            <option className="text-orange-500" value="none">
              Sort by Rating
            </option>
            <option className="text-orange-500" value="asc">
              Low -&gt; by High
            </option>
            <option className="text-orange-500" value="desc">
              High -&gt; by Low
            </option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-6 w-full">
        {isLoading
          ? // Show skeleton cards while loading
            Array.from({ length: 12 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))
          : // Show actual books when loaded
            sortItem.map((book) => (
              <Card key={book._id || book.id} book={book} />
            ))}
      </div>
    </div>
  );
};

export default AllBooks;
