import React from "react";

const AboutBookhaven = () => {
  return (
    <div className="  bg-white shadow-lg border rounded-2xl p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        About <span className="text-orange-600">The Book Haven</span>
      </h2>

      <p className="text-gray-500 text-lg mb-6">
        Your trusted corner for stories, knowledge & imagination.
      </p>

      <p className="text-gray-700 leading-relaxed mb-8">
        The Book Haven is a digital sanctuary built for passionate readers.
        Whether you're exploring new releases, discovering hidden gems, or
        revisiting timeless classics, our platform is designed to deliver a
        smooth and enjoyable reading journey. Dive into expertly curated
        collections, personalized recommendations, and beautifully crafted book
        showcases.
      </p>

      <button className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition-all duration-300">
        Explore More
      </button>
    </div>
  );
};

export default AboutBookhaven;
