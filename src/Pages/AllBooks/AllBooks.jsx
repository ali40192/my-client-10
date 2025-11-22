import React, { useState } from "react";
import { useLoaderData } from "react-router";
import Card from "../../Components/BookCard/Card";

const AllBooks = () => {
  const [sort, setSort] = useState("none");
  const allbooks = useLoaderData();

  const sortItem = (() => {
    if (sort === "asc") {
      return [...allbooks].sort((a, b) => a.rating - b.rating);
    }
    if (sort === "desc") {
      return [...allbooks].sort((a, b) => b.rating - a.rating);
    }
    return allbooks;
  })();

  return (
    <div className="w-[80%] mx-auto my-8">
      <div className="text-center border border-b-[#F0E491] p-4 w-[40%] mx-auto rounded-3xl">
        <h1 className="text-3xl font-bold text-[#31694E]">All Books</h1>
      </div>
      <div className="flex justify-between  my-8">
        <h1 className="font-bold text-xl text-[#31694E]">
          Number of Books{" "}
          <span className="text-xs font-normal text-gray-500">
            ({allbooks.length})
          </span>
        </h1>
        <label className="form-control">
          <select
            className="select select-bordered select-sm select-primary w-full max-w-xs"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sortItem.map((book) => (
          <Card key={book.id} book={book}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
