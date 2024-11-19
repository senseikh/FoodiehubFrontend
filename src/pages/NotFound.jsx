import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
        <p className="text-2xl font-medium text-gray-700 mb-8">
          Oops! We can't seem to find the page you're looking for.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
        {/* Optional: Add a decorative image or SVG */}
        <div className="mt-10">
          <img
            src="https://via.placeholder.com/150"
            alt="Decorative illustration"
            className="mx-auto w-40 opacity-70"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
