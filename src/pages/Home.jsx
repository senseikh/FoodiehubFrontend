import React, { useState, useEffect } from "react";
import Api from "../api";
import Recipe from "./Recipe/Recipe";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    Api.get("/api/recipe/")
      .then((res) => res.data)
      .then((data) => {
        setRecipes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteRecipe = (id) => {
    Api.delete(`/api/recipe/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Recipe Deleted Successfully");
          getRecipes();
        } else {
          alert("Failed to delete");
        }
      })
      .catch((error) =>
        alert(`Error: ${error.response?.data || error.message}`)
      );
  };

  const navigateToAddRecipe = () => {
    navigate("/dashboard/add-recipe");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Recipes</h2>
        <button
          onClick={navigateToAddRecipe}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <FiPlus size={20} />
          <span>Add Recipe</span>
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Recipe recipe={recipe} onDelete={deleteRecipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
