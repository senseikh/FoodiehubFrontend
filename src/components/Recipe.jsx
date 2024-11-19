import React from "react";

const Recipe = ({ recipe, onDelete }) => {
  const formattedDate = new Date(recipe.created_at).toLocaleDateString("en-US");

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
      <p className="text-gray-600 mb-4">{recipe.content}</p>
      <p className="text-sm text-gray-500 mb-4">Created on: {formattedDate}</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        onClick={() => onDelete(recipe.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Recipe;
