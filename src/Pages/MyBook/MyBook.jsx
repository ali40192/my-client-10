import React, { use, useEffect, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import Card from "../../Components/BookCard/Card";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";

const MyBook = () => {
  const { user } = use(AuthContext);
  const [mybooks, setMybooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`http://localhost:3000/mybooks?email=${user?.email}`).then((data) => {
      setMybooks(data.data);
      setLoading(false);
    });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader></Loader>
      </div>
    );
  }
  return (
    <div className="my-5 text-center">
      {" "}
      <div className=" border border-b-[#F0E491] p-4 w-[40%] mx-auto rounded-3xl">
        <h1 className="text-3xl font-bold text-[#31694E]">
          All Of Your Fovourite Books
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-[80%] mx-auto my-8 bg-synthwave">
        {mybooks.map((book) => (
          <Card key={book.id} book={book}></Card>
        ))}
      </div>
    </div>
  );
};

export default MyBook;
