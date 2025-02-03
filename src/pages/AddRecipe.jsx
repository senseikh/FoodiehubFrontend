import React, { useState } from "react";
import Api from "../api";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit3 } from "lucide-react";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState("");
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createRecipe = (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    Api.post("/api/recipe/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/dashboard/home");
        } else {
          alert("Failed to create recipe");
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 via-white to-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 flex items-center mb-6">
          <PlusCircle className="w-6 h-6 mr-2 text-indigo-500" />
          Create a New Recipe
        </h2>
        <form onSubmit={createRecipe} className="space-y-6">
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
              placeholder="Enter recipe title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-500 px-4 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Recipe content:
            </label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Write your recipe content here..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-500 px-4 py-2 h-32 resize-none"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="ingredients"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Recipe ingredients:
            </label>
            <textarea
              id="content"
              name="content"
              required
              placeholder="Write your recipe details here..."
              onChange={(e) => setIngredients(e.target.value)}
              value={ingredients}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-500 px-4 py-2 h-32 resize-none"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2 flex items-center"
            >
              <Edit3 className="w-5 h-5 mr-2 text-gray-500" />
              Recipe Image:
            </label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring focus:ring-indigo-300 focus:border-indigo-500 px-4 py-2"
            />

            {imagePreview && (
              <div className="mt-4">
                <p className="text-gray-700 font-medium">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-32 h-32 object-cover rounded-lg mt-2"
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
