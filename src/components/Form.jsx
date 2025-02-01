import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  UserCogIcon,
} from "lucide-react";
import Api from "../api";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Form({ route, method }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "user", // New field for role selection
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";
  const isRegister = method === "register";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (isRegister) {
      if (formData.password !== formData.confirm_password) {
        setError("Passwords do not match");
        return false;
      }
      if (formData.password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }
      if (!formData.email.includes("@")) {
        setError("Please enter a valid email address");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setError("");

    try {
      const payload = isRegister
        ? {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirm_password,
            role: formData.role, // Include role in payload
          }
        : {
            email: formData.email,
            password: formData.password,
            role: formData.role, // Include role for login
          };

      console.log("Sending payload:", payload);

      const res = await Api.post(route, payload);
      console.log("Success response:", res.data);

      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        // Redirect based on role
        navigate(
          formData.role === "admin" ? "/admin/dashboard" : "/dashboard/home"
        );
      } else {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        Object.entries(error.response?.data || {})
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ") ||
        "Something went wrong";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            {name} {formData.role === "admin" ? "as Admin" : "as User"}
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Role Selection Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCogIcon className="w-5 h-5 text-gray-400" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {isRegister && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required={isRegister}
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            {isRegister && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required={isRegister}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 mt-6 text-white font-semibold rounded-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          >
            {loading ? "Loading..." : name}
          </button>

          <div className="mt-4 text-sm text-gray-600 text-center">
            {isRegister ? (
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login here
                </a>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Register here
                </a>
              </p>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Form;
