import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../api";
import { Edit3, Save } from "lucide-react";

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
      .catch(() => alert("Failed to fetch recipe"));
  }, [id]);

  const updateRecipe = (e) => {
    e.preventDefault();
    Api.put(`/api/recipes/${id}/`, { title, content })
      .then((res) => {
        if (res.status === 200) {
          alert("Recipe Updated Successfully");
          navigate(`/dashboard/recipe/${id}`);
        } else {
          alert("Failed to update recipe");
        }
      })
      .catch(() => alert("Error updating recipe"));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-100 via-white to-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 flex items-center mb-6">
          <Edit3 className="w-6 h-6 mr-2 text-green-500" />
          Edit Recipe
        </h2>
        <form onSubmit={updateRecipe} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Recipe Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Update recipe title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:border-green-500 px-4 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Recipe Content:
            </label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Update recipe details here..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-green-300 focus:border-green-500 px-4 py-2 h-32 resize-none"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all"
            >
              <Save className="w-5 h-5 inline-block mr-2" />
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
