import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <Navbar />
      </header>
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to Foodie Hub!
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Discover, share, and create delicious recipes with a vibrant
            community of food enthusiasts.
          </p>
          <Link
            to="/dashboard/home"
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
          >
            Explore Recipes
          </Link>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Featured Blogs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Blog 1", "Blog 2", "Blog 3"].map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={`https://via.placeholder.com/400x200?text=${blog}`}
                  alt={blog}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-bold text-gray-800">{blog}</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <Link
                    to="/dashboard/home"
                    className="text-blue-600 hover:underline mt-4 block"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
