import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const { token } = useParams();
  const [showMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    Api.post(`api/password_reset/confirm/`, {
      password: data.password,
      token: token,
    }).then(() => {
      setShowMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 6000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        {showMessage && (
          <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
            Your password reset was successful. Redirecting to login page...
          </div>
        )}

        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit(submission)} className="space-y-4">
          {/* Password Input */}
          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              name="password"
              {...control.register("password", { required: "Password is required" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-gray-600 mb-1">Confirm Password</label>
            <input
              type="password"
              name="password2"
              {...control.register("password2", { required: "Confirm your password" })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Re-enter new password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
