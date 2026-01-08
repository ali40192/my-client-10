import { Link } from "react-router";
import PropTypes from "prop-types";

const Card = ({ book }) => {
  // Add prop validation
  if (!book) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 max-w-sm mx-auto">
        <div className="text-center text-gray-500">
          <p>Book data not available</p>
        </div>
      </div>
    );
  }

  const { title, author, genre, rating, coverImage, _id } = book;
  const stars = Math.round(rating);

  return (
    <div
      className="
        bg-white rounded-lg
        shadow-sm hover:shadow-md
        transition-all duration-300
        max-w-sm mx-auto
        overflow-hidden
        hover:-translate-y-0.5
        w-full
      "
    >
      <div className="relative overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="
            w-full h-36 sm:h-40
            object-cover
            transition-transform duration-300
            hover:scale-105
          "
        />

        {/* Genre Badge */}
        <span className="absolute top-1.5 left-1.5 bg-amber-100 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded shadow">
          {genre}
        </span>
      </div>

      {/* 📖 Content — padding & gap কম */}
      <div className="p-2 flex flex-col gap-1.5">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>

          <p className="text-[11px] text-gray-500 mt-0.5">
            by <span className="italic">{author}</span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < stars ? "text-amber-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-[11px] text-gray-500 ml-1">{rating}</span>
          </div>
        </div>

        {/* 🔘 Button — compact */}
        <Link
          to={`/bookdetails/${_id}`}
          className="
            btn btn-xs w-full
            border border-[#eaf091]
            bg-[#F0E491] text-[#31694E]
            font-bold rounded-md
            transition-all duration-300
            hover:bg-[#e6dc70]
          "
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    coverImage: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
