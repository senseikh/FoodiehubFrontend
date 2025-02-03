import React, { useState, useEffect } from "react";
import { PlusCircle, Edit3, Trash2, Eye, EyeOff, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Api from "../../api";

const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await Api.get("/api/blogs/my-blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
    setIsPublic(true);
    setSelectedBlog(null);
    setEditMode(false);
  };

  const handleEdit = (blog) => {
    setEditMode(true);
    setSelectedBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setIsPublic(blog.is_public);
    setImagePreview(blog.image);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await Api.delete(`/api/blogs/${blogId}`);
        fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog post");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("is_public", isPublic);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (editMode) {
        await Api.put(`/api/blogs/${selectedBlog.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await Api.post("/api/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog post");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 via-white to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-purple-600 flex items-center mb-6">
            <BookOpen className="w-6 h-6 mr-2 text-purple-500" />
            {editMode ? "Edit Blog Post" : "Create a New Blog Post"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
                Blog Title:
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300 focus:border-purple-500 px-4 py-2"
                placeholder="Enter blog title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
                Blog Content:
              </label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300 focus:border-purple-500 px-4 py-2 h-48 resize-none"
                placeholder="Write your blog content here..."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
                Blog Image:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300 focus:border-purple-500 px-4 py-2"
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-gray-700 font-medium">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg mt-2"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="isPublic" className="text-gray-700 font-medium">
                Make this post public
              </label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all"
              >
                {editMode ? "Update Blog Post" : "Publish Blog Post"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">
            My Blog Posts
          </h2>
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {blog.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      {blog.is_public ? (
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" /> Public
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <EyeOff className="w-4 h-4 mr-1" /> Private
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
