import React from "react";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MyTourGuide</h1>
        <div className="flex items-center bg-white text-gray-800 rounded-full px-4 py-2 shadow-md w-64">
          <Search className="w-5 h-5 text-blue-600 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
