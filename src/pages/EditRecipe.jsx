// EditRecipe.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    Api.get(`/api/recipes/${id}/`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => alert("Failed to fetch recipe"));
  }, [id]);

  const updateRecipe = (e) => {
    e.preventDefault();
    Api.put(`/api/recipes/${id}/`, { title, content })
      .then((res) => {
        if (res.status === 200) {
          alert("Recipe Updated Successfully");
          navigate(`/recipes/${id}`);
        } else {
          alert("Failed to update recipe");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Recipe</h2>
        <form onSubmit={updateRecipe} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-600 font-medium mb-1"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-gray-600 font-medium mb-1"
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              required
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-500 h-32"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
