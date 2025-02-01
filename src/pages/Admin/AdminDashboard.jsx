import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Outlet } from "react-router-dom";
import {
  BookIcon,
  UsersIcon,
  LayoutGridIcon,
  TagIcon,
  RefreshCwIcon,
  TrendingUpIcon,
  LogOutIcon,
  SettingsIcon,
  ChevronDownIcon,
  MenuIcon,
} from "lucide-react";
import Api from "../../api";

const NavBar = ({ onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-800">Admin</span>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MenuIcon className="w-5 h-5" />
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={() => {
                    navigate("/admin/settings");
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full"
                >
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const StatCard = ({ icon: Icon, label, value, className, onClick, trend }) => (
  <div
    onClick={onClick}
    className={`w-full flex flex-col p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 rounded-lg bg-white bg-opacity-80">
        <Icon className="w-8 h-8" />
      </div>
      {trend && (
        <div className="flex items-center text-green-600">
          <TrendingUpIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">+{trend}%</span>
        </div>
      )}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{label}</h3>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    total_recipes: 0,
    total_users: 0,
    total_categories: 0,
    total_tags: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await Api.get("/api/admin/dashboard/");
      setDashboardData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
      setError("Failed to load dashboard data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      icon: BookIcon,
      label: "Total Recipes",
      value: dashboardData.total_recipes,
      className: "bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600",
      route: "/admin/recipes/",
      trend: 12,
    },
    {
      icon: UsersIcon,
      label: "Total Users",
      value: dashboardData.total_users,
      className: "bg-gradient-to-br from-green-50 to-green-100 text-green-600",
      route: "/admin/users/",
      trend: 8,
    },
    {
      icon: LayoutGridIcon,
      label: "Total Categories",
      value: dashboardData.total_categories,
      className:
        "bg-gradient-to-br from-purple-50 to-purple-100 text-purple-600",
      route: "/admin/categories",
      trend: 5,
    },
    {
      icon: TagIcon,
      label: "Total Tags",
      value: dashboardData.total_tags,
      className:
        "bg-gradient-to-br from-orange-50 to-orange-100 text-orange-600",
      route: "/admin/tags",
      trend: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar onLogout={logout} />

      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
          >
            <RefreshCwIcon
              className={`mr-2 w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh Data
          </button>
        </div>

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6"
            role="alert"
          >
            <div className="flex">
              <div className="py-1">
                <svg
                  className="w-6 h-6 mr-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-full h-40 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                className={stat.className}
                trend={stat.trend}
                onClick={() => navigate(stat.route)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
