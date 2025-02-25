import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../assets/download.png'
// import logo from '../assets/download.svg'

const CuatomizedNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isCommunityDropdownOpen, setCommunityDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // const handleSearch = (e) => {
  //     e.preventDefault();
  //     if (searchQuery.trim()) {
  //         navigate(/search?q=${encodeURIComponent(searchQuery)});
  //     }
  // };

  const handleLogout = () => {
    alert("Logging out...");
    // Add actual logout logic here
  };

  return (
    <nav className="bg-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="flex items-center space-x-3 text-white text-2xl font-bold"
        >
          <img
            src={logo}
            alt="FoodieHub Logo"
            className="h-10 w-10"
          />
          <span>Foodie Hub</span>
        </NavLink>

        {/* Desktop Navigation */}
        <form
          // onSubmit={handleSearch}
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
            🔍
          </button>
        </form>
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-gray-400"
            }
          >
            BlogPage
          </NavLink>
          <NavLink
            to="/Recipes"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-gray-400"
            }
          >
            Recipes
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-gray-400"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-400 font-semibold"
                : "text-white hover:text-gray-400"
            }
          >
            Contact
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
                    to="/comminity"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Hotels & Restaurants Nearby
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community#collaboration"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Collaborate with Other Restaurants
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community#community-support"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Community Support & Resources
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

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
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 text-white p-4">
          <NavLink to="/BlogPage" className="block py-2">
            BlogPage
          </NavLink>
          <NavLink to="/Recipes" className="block py-2">
            Recipes
          </NavLink>
          <NavLink to="/about" className="block py-2">
            About
          </NavLink>
          <NavLink to="/contact" className="block py-2">
            Contact
          </NavLink>
          <button
            onClick={() => setCommunityDropdownOpen(!isCommunityDropdownOpen)}
            className="block py-2"
          >
            Community
          </button>
          {isCommunityDropdownOpen && (
            <div>
              <NavLink
                to="/community#hotels-restaurants"
                className="block py-2"
              >
                Hotels & Restaurants Nearby
              </NavLink>
              <NavLink to="/community#collaboration" className="block py-2">
                Collaborate with Other Restaurants
              </NavLink>
              <NavLink to="/community#community-support" className="block py-2">
                Community Support & Resources
              </NavLink>
            </div>
          )}
          <button
            onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
            className="block py-2"
          >
            Profile
          </button>
          {isProfileDropdownOpen && (
            <div>
              <NavLink to="/profile" className="block py-2">
                My Profile
              </NavLink>
              <NavLink to="/settings" className="block py-2">
                Settings
              </NavLink>
              <NavLink to="/account" className="block py-2">
                Account
              </NavLink>
              <button onClick={handleLogout} className="block py-2">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default CuatomizedNavbar;
