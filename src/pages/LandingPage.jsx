import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to <span className="text-yellow-300">Foodie Hub</span>!
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Discover, share, and create delicious recipes with a vibrant
            community of food enthusiasts.
          </p>
          <Link
            to="/dashboard/home"
            className="bg-yellow-300 text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition duration-300"
          >
            Explore Recipes
          </Link>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Featured Blogs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Blog 1", "Blog 2", "Blog 3"].map((blog, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={`https://via.placeholder.com/400x200?text=${blog}`}
                  alt={blog}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800">{blog}</h4>
                  <p className="text-gray-600 text-sm mt-2">
                    Discover amazing recipes, cooking tips, and stories from our
                    passionate bloggers.
                  </p>
                  <Link
                    to="/blogs"
                    className="text-blue-600 hover:underline mt-4 block font-semibold"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Want to Share Your Recipes?
          </h2>
          <p className="text-gray-600 mb-8">
            Join our growing community of food enthusiasts and share your
            culinary creations with the world.
          </p>
          <Link
            to="/login"
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
