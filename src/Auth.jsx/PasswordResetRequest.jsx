import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import Api from "../api";
const PasswordResetRequest = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submission = (data) => {
    Api.post("api/password_reset/", { email: data.email })
      .then((response) => {
        setShowMessage(true);
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Failed to send reset link. Please try again.");
        console.error("Password reset error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Password Reset Request
        </h2>

        {showMessage ? (
          <p className="text-green-600 text-center">
            A password reset link has been sent to your email.
          </p>
        ) : (
          <form onSubmit={handleSubmit(submission)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Enter your email"
                    required
                  />
                )}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Request Password Reset
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetRequest;
