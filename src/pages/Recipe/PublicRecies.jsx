
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../../api";
import Navbar from "../../components/Navbar";
import {
  Search,
  RefreshCw,
  Book,
  Clock,
  User,
  Tag,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

const PublicRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchPublicRecipes = async () => {
      try {
        setLoading(true);
        const response = await Api.get("/api/recipes/public/");
        const data = Array.isArray(response.data) ? response.data : [];
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Error fetching public recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicRecipes();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, recipes]);

  // Helper function to safely display author information
  const getAuthorDisplay = (author) => {
    if (!author) return "Unknown Chef";
    if (typeof author === "string") return author;
    if (typeof author === "object") {
      // Return username if available, otherwise fallback to a generic display
      return (
        author.username || author.name || "Chef #" + author.id || "Unknown Chef"
      );
    }
    return "Unknown Chef";
  };

  // Helper function to get comment count
  const getCommentCount = (recipe) => {
    if (!recipe.comments) return 0;
    return Array.isArray(recipe.comments) ? recipe.comments.length : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mt-12 container mx-auto py-8 px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              <Book className="inline-block mr-2 mb-1" size={24} /> Public
              Recipes
            </h1>
            <p className="text-gray-600 mt-1">
              Discover delicious recipes shared by our community
            </p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64 lg:w-96">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw
              className="animate-spin text-indigo-600 mb-4"
              size={32}
            />
            <p className="text-gray-600">Loading delicious recipes...</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">
              No recipes found. Try a different search term or check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {recipe.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {recipe.content}
                  </p>

                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <User size={14} className="mr-1" />
                    <span>{getAuthorDisplay(recipe.author)}</span>
                    {recipe.cooking_time && (
                      <>
                        <Clock size={14} className="ml-4 mr-1" />
                        <span>{recipe.cooking_time}</span>
                      </>
                    )}

                    {/* Comment count */}
                    <div className="ml-4 flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      <span>{getCommentCount(recipe)}</span>
                    </div>
                  </div>

                  {recipe.tags && recipe.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                        >
                          <Tag size={10} className="inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    to={`/recipe/${recipe.id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2"
                  >
                    View Recipe
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicRecipes;
