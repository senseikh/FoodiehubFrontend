import React from "react";
import { Home, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
          <span role="img" aria-label="food">
            🍴
          </span>
          <span>Foodie Hub</span>
        </h1>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {/* Home */}
          <a
            href="/"
            className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
          >
            <Home className="w-5 h-5 mr-1" />
            Home
          </a>

          {/* Login */}
          <a
            href="/login"
            className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
          >
            <LogIn className="w-5 h-5 mr-1" />
            Login
          </a>

          {/* Register */}
          <a
            href="/register"
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            <UserPlus className="w-5 h-5 mr-1" />
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
