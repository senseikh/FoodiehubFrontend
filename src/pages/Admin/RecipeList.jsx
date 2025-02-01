import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../../api";
import {
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  SearchIcon,
  ChefHatIcon,
} from "lucide-react";

const RecipeCard = ({ recipe }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <img
      src={recipe.image || "/api/placeholder/400/250"}
      alt={recipe.title}
      className="h-48 w-full object-cover"
    />
    <div className="p-5">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {recipe.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{recipe.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-1" />
          <span>{recipe.cooking_time} mins</span>
        </div>
        <div className="flex items-center">
          <UserIcon className="w-4 h-4 mr-1" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>
    </div>
  </div>
);

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on search query
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchQuery, recipes]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await Api.get("/api/recipe/list/");
      setRecipes(response.data);
      setFilteredRecipes(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
      console.error("Error fetching recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl h-80 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <BookOpenIcon className="w-8 h-8 mr-2" />
            Recipe Collection
          </h1>
          <p className="text-gray-600 mt-2">
            Discover our collection of {recipes.length} delicious recipes
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Recipe Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <ChefHatIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or check back later for new recipes
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
