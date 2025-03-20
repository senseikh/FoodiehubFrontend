import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import Api from "../../api";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = () => {
    Api.get(`/api/blogs/${id}/`)
      .then((res) => setBlog(res.data))
      .catch((error) =>
        alert(
          `Failed to fetch blog: ${
            error.response?.data?.detail || "Unknown error"
          }`
        )
      );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      Api.delete(`/api/blogs/${id}/`).then(() => navigate("/dashboard/home"));
    }
  };

  if (!blog)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );

  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white/90 shadow-xl rounded-2xl overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-t-2xl border border-gray-300 shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/600x400";
          }}
        />

        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {blog.title}
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">{blog.content}</p>

          <div className="mt-8 flex items-center justify-between">
            <Link
              to="/blogs/public"
              className="flex items-center text-blue-500 hover:text-blue-600 transition"
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

export default BlogDetail;
