import React from "react";
import { useLoaderData } from "react-router";
import Card from "../../Components/BookCard/Card";

const AllBooks = () => {
  const allbooks = useLoaderData();
  return (
    <div className="w-[80%] mx-auto my-8">
      <h1 className="text-4xl font-bold text-center text-green-500 mb-8">
        All Books Hare...
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allbooks.map((book) => (
          <Card key={book.id} book={book}></Card>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
