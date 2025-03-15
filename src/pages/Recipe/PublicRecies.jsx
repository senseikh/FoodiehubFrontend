import { useEffect, useState } from "react";
import axios from "axios";
import Api from "../../api";

const PublicRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicRecipes = async () => {
      try {
        const response = await Api.get("/api/recipes/public/");
        setRecipes(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching public recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicRecipes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading recipes...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">
        Public Recipes
      </h1>

      {recipes.length === 0 ? (
        <p className="text-gray-500">No public recipes available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-600 mt-2">{recipe.content}</p>
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.author}
                  // className="w-full h-48 object-cover"
                  className="w-full h-40 object-cover rounded-lg border border-gray-300 shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicRecipes;
