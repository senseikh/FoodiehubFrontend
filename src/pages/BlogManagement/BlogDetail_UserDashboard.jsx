import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, Trash2, ArrowLeft } from "lucide-react"; // Import Lucide React icons
import Api from "../../api";

const BlogDetail_userDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = () => {
    Api.get(`/api/blogs/${id}/`)
      .then((res) => {
        console.log("Full API Response:", res);
        console.log("Response Data:", res.data);
        setBlog(res.data);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        console.error("Error Response:", error.response);
        alert(
          `Failed to fetch blog: ${
            error.response?.data?.detail || "Unknown error"
          }`
        );
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      Api.delete(`/api/blogs/${id}/`)
        .then(() => {
          navigate("/dashboard/home");
        })
        .catch(() => alert("Failed to delete blog"));
    }
  };

  if (!blog)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg border border-gray-300 shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/600x400";
          }}
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
          <p className="mt-4 text-gray-600">{blog.content}</p>

          <div className="mt-6 flex items-center justify-between">

            <Link
              to="/dashboard/blogs"
              className="flex items-center text-gray-500 hover:text-gray-700 transition"
            >
              <ArrowLeft size={18} className="mr-2" />{" "}
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail_userDashboard;
