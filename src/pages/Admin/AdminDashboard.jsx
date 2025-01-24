import React, { useState, useEffect } from "react";
import {
  BookIcon,
  UsersIcon,
  LayoutGridIcon,
  TagIcon,
  RefreshCwIcon,
} from "lucide-react";
import Api from "../../api";

const StatCard = ({ icon: Icon, label, value, className }) => (
  <div
    className={`w-full flex items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${className}`}
  >
    <div className="mr-4">
      <Icon className="w-10 h-10 text-blue-500" />
    </div>
    <div>
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_recipes: 0,
    total_users: 0,
    total_categories: 0,
    total_tags: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={fetchDashboardData}
          disabled={isLoading}
          className="flex items-center px-4 py-2 border rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <RefreshCwIcon className="mr-2 w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-4 gap-4 animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={BookIcon}
            label="Total Recipes"
            value={dashboardData.total_recipes}
            className="bg-blue-50 hover:bg-blue-100"
          />
          <StatCard
            icon={UsersIcon}
            label="Total Users"
            value={dashboardData.total_users}
            className="bg-green-50 hover:bg-green-100"
          />
          <StatCard
            icon={LayoutGridIcon}
            label="Total Categories"
            value={dashboardData.total_categories}
            className="bg-purple-50 hover:bg-purple-100"
          />
          <StatCard
            icon={TagIcon}
            label="Total Tags"
            value={dashboardData.total_tags}
            className="bg-orange-50 hover:bg-orange-100"
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
