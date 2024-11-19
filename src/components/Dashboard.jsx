import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">Foodie Hub</h1>
        </div>
        <nav className="mt-6 space-y-2">
          <NavLink
            to="/dashboard/home"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-gray-700 font-medium ${
                isActive ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-200"
              }`
            }
          >
            Recipe Management
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-gray-700 font-medium ${
                isActive ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-200"
              }`
            }
          >
            Blog Management
          </NavLink>
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-gray-700 font-medium ${
                isActive ? "bg-indigo-100 text-indigo-600" : "hover:bg-gray-200"
              }`
            }
          >
            App Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="relative">
            {/* Account Icon */}
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-indigo-300"
            >
              <span className="text-gray-700 font-medium">Account</span>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
