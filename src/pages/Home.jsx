import React, { useState, useEffect } from "react";
import Api from "../api";
import Recipe from "../components/Recipe";

const Home = () => {
  const [recipes, setRecipe] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    Api.get("/api/recipe/")
      .then((res) => res.data)
      .then((data) => {
        setRecipe(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteRecipe = (id) => {
    Api.delete(`/api/recipe/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Recipe Deleted Successfully");
        } else {
          alert("Failed to delete");
        }
        getRecipes(); 
      })
      .catch((error) =>
        alert(`Error: ${error.response?.data || error.message}`)
      );
  };

  const createRecipe = (e) => {
    e.preventDefault();
    Api.post("/api/recipe/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Recipe Created Successfully");
        else alert("Failed To create");
        getRecipes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Recipes Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Recipes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <Recipe recipe={recipe} onDelete={deleteRecipe} key={recipe.id} />
          ))}
        </div>
      </div>

      {/* Create Recipe Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Create Recipe
        </h2>
        <form onSubmit={createRecipe} className="space-y-4">
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
              name="content"
              id="content"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
