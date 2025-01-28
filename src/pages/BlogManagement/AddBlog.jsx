import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit3, BookOpen } from "lucide-react";
import Api from "../../api";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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

  const createBlog = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    Api.post("/api/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/dashboard/blogs"); // Updated to match your route structure
        } else {
          alert("Failed to create blog post");
        }
      })
      .catch((err) => {
        console.error("Error details:", err);
        alert(
          "Error creating blog post: " +
            (err.response?.data?.message || err.message)
        );
      });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 via-white to-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-600 flex items-center mb-6">
          <BookOpen className="w-6 h-6 mr-2 text-purple-500" />
          Create a New Blog Post
        </h2>
        <form onSubmit={createBlog} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Blog Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Enter blog title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300 focus:border-purple-500 px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Blog Content:
            </label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Write your blog content here..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-purple-300 focus:border-purple-500 px-4 py-2 h-48 resize-none"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Blog Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
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

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all"
            >
              Publish Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
