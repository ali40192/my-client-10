import React from "react";
import Banner from "./Banner";
import Card from "../../Components/BookCard/Card";
import { useLoaderData } from "react-router";
import BooksWeek from "../../Components/StaticComponents/BooksWeek";
import AboutBookhaven from "../../Components/StaticComponents/AboutBookhaven";

const Home = () => {
  const books = useLoaderData();
  console.log(books);

  return (
    <div className="space-y-8 text-center flex flex-col items-center w-[80%] mx-auto my-8 ">
      <Banner></Banner>
      <h1 className="text-3xl font-bold text-green-500">
        Recent and Popular Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
        {books.map((book) => (
          <Card key={book.id} book={book}></Card>
        ))}
      </div>
      <h1 className="font-bold text-3xl text-green-500">See More Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full my-8">
        <BooksWeek></BooksWeek>
        <AboutBookhaven></AboutBookhaven>
      </div>
    </div>
  );
};

export default Home;
