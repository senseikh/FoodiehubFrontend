import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">Foodie Hub</h1>
        <div className="space-x-4">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </a>
          <a
            href="/login"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
