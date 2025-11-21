import React from "react";
import Banner from "./Banner";
import Card from "../../Components/BookCard/Card";
import { useLoaderData } from "react-router";

import AboutBookhaven from "../../Components/StaticComponents/AboutBookhaven";
import BookOfweek from "./BookOfweek";

const Home = () => {
  const books = useLoaderData();
  console.log(books);

  return (
    <div className="space-y-8 text-center flex flex-col items-center w-[80%] mx-auto my-8 ">
      <Banner></Banner>
      <h1 className="text-3xl font-bold  text-[#1abc9c]">
        Recent and Popular Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
        {books.map((book) => (
          <Card key={book.id} book={book}></Card>
        ))}
      </div>
      <h1 className="font-bold  text-3xl text-[#1abc9c]">
        Literary Genres / book
      </h1>
      <div>
        <BookOfweek></BookOfweek>
      </div>
      <AboutBookhaven></AboutBookhaven>
    </div>
  );
};

export default Home;
