import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import Api from "../api";
import Navbar from "./Navbar"; // Import Navbar

import Footer from "./Footer"; // Import Footer
import PreLoader from "./PreLoader"; // Keep PreLoader if you want to use it in the future

function Form({ route, method }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Show loading state

    try {
      // API call
      const res = await Api.post(route, { username, password });

      if (method === "login") {
        // Save tokens to localStorage for authentication
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        // Navigate to the dashboard/home page after login
        navigate("/dashboard/home");
      } else {
        // Redirect to the login page after registration
        navigate("/login");
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        alert(
          `Error: ${error.response.data?.detail || "Something went wrong."}`
        );
      } else if (error.request) {
        // Request was made but no response was received
        alert(
          "Error: Unable to connect to the server. Please try again later."
        );
      } else {
        // An error occurred while setting up the request
        alert(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Component */}
      <Navbar />

      {/* Main Form Section */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            {name}
          </h1>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Loading..." : name}
          </button>

          {method === "register" && (
            <p className="mt-4 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login here
              </a>
            </p>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Form;
