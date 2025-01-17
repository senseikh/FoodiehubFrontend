// RecipeList.jsx
import React, { useEffect, useState } from "react";
import Api from "../api";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    Api.get("/api/recipes/")
      .then((res) => {
        setRecipes(res.data);
      })
      .catch((err) => alert("Failed to fetch recipes"));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="mb-4 p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p>{recipe.content.slice(0, 100)}...</p>
            <Link
              to={`/recipes/${recipe.id}`}
              className="text-indigo-500 hover:underline"
            >
              View Recipe
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
