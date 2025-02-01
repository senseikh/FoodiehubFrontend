import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Api from "../api";

const LandingPage = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await Api.get("/api/blogs/");
      // Get the first 4 blogs from the response
      setFeaturedBlogs(response.data.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <Navbar />
      </header>

      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to <span className="text-yellow-300">Foodie Hub</span>!
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Discover, share, and create delicious recipes with a vibrant
            community of food enthusiasts.
          </p>
          <div className="space-x-4">
            <Link
              to="/dashboard/home"
              className="bg-yellow-300 text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-yellow-400 transition duration-300"
            >
              Explore Recipes
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300"
            >
              Join as User
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blogs Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-3xl font-bold text-gray-800">Featured Blogs</h3>
            <Link
              to="/blogs"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Blogs →
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">
              Loading featured blogs...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredBlogs.map((blog) => (
                <Link
                  to={`/blogs/${blog.id}`}
                  key={blog.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
                >
                  <img
                    src={
                      blog.image ||
                      `https://via.placeholder.com/400x200?text=Blog`
                    }
                    alt={blog.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {blog.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {blog.content}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-blue-600 font-semibold">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section with User/Admin Options */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-600 mb-8">
            Choose how you want to be part of our growing food community
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register as User
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300"
            >
              Register as Admin
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
