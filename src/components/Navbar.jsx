// import React from "react";
// import { Home, LogIn, UserPlus, LogOut } from "lucide-react";

// const Navbar = () => {
//   const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <h1 className="text-2xl font-bold text-blue-600 flex items-center space-x-2">
//           <span role="img" aria-label="food">🍴</span>
//           <span>Foodie Hub</span>
//         </h1>

//         {/* Navigation Links */}
//         <div className="flex space-x-6">
//           {/* Home */}
//           <a
//             href="/"
//             className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
//           >
//             <Home className="w-5 h-5 mr-1" />
//             Home
//           </a>

//           {!isAuthenticated ? (
//             <>
//               {/* Login */}
//               <a
//                 href="/login"
//                 className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
//               >
//                 <LogIn className="w-5 h-5 mr-1" />
//                 Login
//               </a>

//               {/* Register */}
//               <a
//                 href="/register"
//                 className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
//               >
//                 <UserPlus className="w-5 h-5 mr-1" />
//                 Register
//               </a>
//             </>
//           ) : (
//             <>
//               {/* Dashboard */}
//               <a
//                 href="/dashboard"
//                 className="flex items-center text-gray-700 hover:text-blue-600 font-medium"
//               >
//                 Dashboard
//               </a>

//               {/* Logout */}
//               <a
//                 href="/logout"
//                 className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
//                 onClick={() => localStorage.clear()} // Clears token on logout
//               >
//                 <LogOut className="w-5 h-5 mr-1" />
//                 Logout
//               </a>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, LogIn, UserPlus, LogOut, Search, Menu, X } from "lucide-react";
import logo from "../assets/download.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isCommunityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("Logging out...");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="flex items-center space-x-3 text-white text-2xl font-bold"
        >
          <img src={logo} alt="FoodieHub Logo" className="h-10 w-10" />
          <span>Foodie Hub</span>
        </NavLink>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="relative hidden md:block w-1/3"
        >
          <input
            type="text"
            placeholder="Search recipes, blogs..."
            className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-500"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold flex items-center"
                : "text-white hover:text-gray-400 flex items-center"
            }
          >
            <Home className="w-5 h-5 mr-1" />
            Home
          </NavLink>

          <NavLink
            to="/blogs/public"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-gray-400"
            }
          >
            Blogs
          </NavLink>

          <NavLink
            to="/recipes/public/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-gray-400"
            }
          >
            Recipes
          </NavLink>

          {/* Community Section */}
          <div className="relative">
            <button
              onClick={() => setCommunityDropdownOpen(!isCommunityDropdownOpen)}
              className="text-white hover:text-gray-400 flex items-center focus:outline-none"
              aria-expanded={isCommunityDropdownOpen}
            >
              Community
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isCommunityDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                <li>
                  <NavLink
                    to="/community/travel-advisor"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Hotels & Restaurants Nearby
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {!isAuthenticated ? (
            <>
              {/* Login */}
              <NavLink
                to="/login"
                className="flex items-center text-white hover:text-gray-400"
              >
                <LogIn className="w-5 h-5 mr-1" />
                Login
              </NavLink>

              {/* Register */}
              <NavLink
                to="/register"
                className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                <UserPlus className="w-5 h-5 mr-1" />
                Register
              </NavLink>
            </>
          ) : (
            <>
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="text-white hover:text-gray-400 flex items-center focus:outline-none"
                  aria-expanded={isProfileDropdownOpen}
                >
                  Profile
                  <svg
                    className="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {isProfileDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                    <li>
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/account"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Account
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        <span className="flex items-center">
                          <LogOut className="w-5 h-5 mr-1" />
                          Logout
                        </span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white p-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search recipes, blogs..."
                className="w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-800 text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-yellow-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          <NavLink to="/" className="flex items-center py-2">
            <Home className="w-5 h-5 mr-2" />
            Home
          </NavLink>
          <NavLink to="/blogs" className="block py-2">
            Blogs
          </NavLink>
          <NavLink to="/recipes/public/" className="block py-2">
            Recipes
          </NavLink>
          <NavLink to="/about" className="block py-2">
            About
          </NavLink>
          <NavLink to="/contact" className="block py-2">
            Contact
          </NavLink>

          {/* Mobile Community Dropdown */}
          <div>
            <button
              onClick={() => setCommunityDropdownOpen(!isCommunityDropdownOpen)}
              className="flex w-full justify-between items-center py-2"
            >
              <span>Community</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isCommunityDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"
                  }
                />
              </svg>
            </button>
            {isCommunityDropdownOpen && (
              <div className="pl-4 border-l border-gray-700">
                <NavLink to="/community/travel-advisor" className="block py-2">
                  Hotels & Restaurants Nearby
                </NavLink>
              </div>
            )}
          </div>

          {/* Auth Links or Profile for Mobile */}
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="flex items-center py-2">
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="flex items-center mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Register
              </NavLink>
            </>
          ) : (
            <>
              <button
                onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex w-full justify-between items-center py-2"
              >
                <span>Profile</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isProfileDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"
                    }
                  />
                </svg>
              </button>
              {isProfileDropdownOpen && (
                <div className="pl-4 border-l border-gray-700">
                  <NavLink to="/login" className="block py-2">
                    Dashboard
                  </NavLink>
                  <NavLink to="/login" className="block py-2">
                    My Profile
                  </NavLink>
                  <NavLink to="/login" className="block py-2">
                    Settings
                  </NavLink>
                  <NavLink to="/login" className="block py-2">
                    Account
                  </NavLink>
                  {/* <button
                    onClick={handleLogout}
                    className="flex items-center py-2 text-red-400"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </button> */}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
