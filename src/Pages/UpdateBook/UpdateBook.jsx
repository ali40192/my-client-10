import React from "react";
import { Form, useLoaderData } from "react-router";
import { toast } from "react-toastify";

const UpdateBook = () => {
  const oldData = useLoaderData();
  const { title, author, summary, coverImage, userEmail, genre, _id, rating } =
    oldData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      title: form.name.value,
      author: form.author.value,
      genre: form.genre.value,
      rating: form.rating.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      userEmail: form.email.value,
      createdAt: new Date().toISOString(),
    };

    console.log(formData);

    fetch(`http://localhost:3000/allbooks/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Book Updated Successfully");
          Form.reset();
        }
      });
  };

  return (
    <div class="w-[60%] mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-[#e67e22] before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-[#f1c40f] after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
      <h2 class="text-2xl text-orange-500 font-bold mb-6">Update Your Book</h2>

      <form onSubmit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600" for="name">
            Book Title
          </label>
          <input
            defaultValue={title}
            name="name"
            class="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600" for="name">
            Author Name
          </label>
          <input
            defaultValue={author}
            name="author"
            class="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600" for="name">
            Genre
          </label>
          <input
            defaultValue={genre}
            name="genre"
            class="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600" for="name">
            Rating
          </label>
          <input
            defaultValue={rating}
            name="rating"
            class="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600" for="name">
            Photo Url
          </label>
          <input
            defaultValue={coverImage}
            name="coverImage"
            class="mt-1 p-2 w-full border rounded-md"
            type="text"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600" for="email">
            Email Address
          </label>
          <input
            defaultValue={userEmail}
            class="mt-1 p-2 w-full border rounded-md"
            name="email"
            id="email"
            type="email"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-600" for="bio">
            Details
          </label>
          <textarea
            defaultValue={summary}
            class="mt-1 p-2 w-full border rounded-md"
            rows="3"
            name="summary"
            id="bio"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            class="[background:linear-gradient(144deg,#e67e22,#d35400_50%,#f1c40f)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
            type="submit"
          >
            Update Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
