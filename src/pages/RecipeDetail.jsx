// RecipeDetail.jsx
import React, { useEffect, useState } from "react";
import Api from "../api";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    Api.get(`/api/recipes/${id}/`)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => alert("Failed to fetch recipe details"));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{recipe.title}</h2>
        <p>{recipe.content}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
