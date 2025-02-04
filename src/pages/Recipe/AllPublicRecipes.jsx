import React, { useState, useEffect } from "react";
import Api from "../../api";
import Recipe from "../../components/Recipe";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

const PublicRecipes = () => {
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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Recipes</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <Recipe recipe={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default PublicRecipes;
