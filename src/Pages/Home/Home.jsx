import Banner from "./Banner";
import Card from "../../Components/BookCard/Card";
import { useQuery } from "@tanstack/react-query";
import AboutBookhaven from "../../Components/StaticComponents/AboutBookhaven";
import BookOfweek from "./BookOfweek";
import useAuth from "../../hooks/useAuth";
import BookCardSkeleton from "../../Components/Skeleton/BookCardSkeleton";
import BannerSkeleton from "../../Components/Skeleton/BannerSkeleton";
import BookOfWeekSkeleton from "../../Components/Skeleton/BookOfWeekSkeleton";

const Home = () => {
  const { user } = useAuth();

  // Fetch latest books with React Query
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const response = await fetch(
        "https://assignment-10-server-three-kappa.vercel.app/leatest-six"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  console.log(user?.accessToken);

  if (error) {
    return (
      <div className="space-y-8 text-center flex flex-col items-center w-[80%] mx-auto my-8">
        <div className="text-red-500 p-8">
          <h2 className="text-2xl font-bold mb-4">Error Loading Books</h2>
          <p>Failed to load the latest books. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-center flex flex-col items-center w-[80%] mx-auto my-8">
      {/* Banner with skeleton loading */}
      {isLoading ? <BannerSkeleton /> : <Banner />}

      <h1 className="text-3xl font-bold text-[#31694E]">
        Recent and Popular Books
      </h1>

      {/* Books grid with skeleton loading */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-6 w-full">
        {isLoading
          ? // Show skeleton cards while loading
            Array.from({ length: 6 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))
          : // Show actual books when loaded
            books?.map((book) => (
              <Card key={book._id || book.id} book={book} />
            ))}
      </div>

      <h1 className="font-bold text-3xl text-[#31694E]">
        Literary Genres / book
      </h1>

      <div>{isLoading ? <BookOfWeekSkeleton /> : <BookOfweek />}</div>

      <AboutBookhaven />
    </div>
  );
};

export default Home;
