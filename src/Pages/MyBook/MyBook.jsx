import React, { use, useEffect, useState } from "react";
import AuthContext from "../../Contexts/AuthContext";
import Card from "../../Components/BookCard/Card";

const MyBook = () => {
  const { user } = use(AuthContext);
  const [mybooks, setMybooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // get my book data
    fetch(`http://localhost:3000/mybooks?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMybooks(data);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-[80%] mx-auto my-8">
        {mybooks.map((book) => (
          <Card key={book.id} book={book}></Card>
        ))}
      </div>
    </div>
  );
};

export default MyBook;
