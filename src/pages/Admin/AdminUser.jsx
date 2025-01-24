import React, { useState, useEffect } from "react";
import { UserCog, CheckCircle2, XCircle } from "lucide-react";
import Api from "../../api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await Api.get("/api/admin/users/");
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching users", error);
        setError("Failed to fetch users. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUser = async (userId) => {
    try {
      const response = await Api.put(`/admin/users/${userId}/`);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, is_active: response.data.is_active }
            : user
        )
      );
    } catch (error) {
      console.error("Error toggling user state", error);
      // Consider adding a toast notification here
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full p-6">
        <UserCog className="animate-spin w-12 h-12 text-gray-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-6 text-center">{error}</div>;
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <UserCog className="w-6 h-6 text-gray-700" />
          User Management
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="p-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.id}
                </td>
                <td className="p-3 whitespace-nowrap text-sm text-gray-500">
                  {user.username}
                </td>
                <td className="p-3 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.is_active ? (
                      <CheckCircle2 className="mr-1 w-4 h-4" />
                    ) : (
                      <XCircle className="mr-1 w-4 h-4" />
                    )}
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => toggleUser(user.id)}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      user.is_active
                        ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                        : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                    }`}
                  >
                    {user.is_active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
