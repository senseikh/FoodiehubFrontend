import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN);
    if (!refresh) {
      throw new Error("No refresh token available");
    }

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refresh,
      });

      if (res.status === 200 && res.data.access) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access); // Fixed typo from 'acess'
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error refreshing token:", error);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      return false;
    }
  };

  const auth = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        // Token is expired, try to refresh
        const refreshSuccess = await refreshToken();
        setIsAuthorized(refreshSuccess);
      } else {
        // Token is still valid
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth().catch((error) => {
      console.error("Auth effect error:", error);
      setIsAuthorized(false);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
