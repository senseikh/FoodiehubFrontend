import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye, Calendar, AlertTriangle } from "lucide-react";

const Recipe = ({ recipe, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const formattedDate = new Date(recipe.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleCardClick = () => {
    navigate(`/dashboard/recipe/${recipe.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    onDelete(recipe.id);
    setIsDeleting(false);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  // const truncateInstructions = (text, maxLength = 150) => {
  //   return text.length > maxLength
  //     ? text.substring(0, maxLength) + "..."
  //     : text;
  // };

  // Truncate content if it's too long
  const truncateContent = (text, maxLength = 150) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div
      className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
      onClick={handleCardClick}
    >
      {/* Card Content */}
      <div className="p-6 cursor-pointer">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {recipe.title}
          </h3>
          <Eye className="w-5 h-5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateInstructions(recipe.instructions)}
        </p> */}

        <p className="text-gray-600 mb-4 line-clamp-3">
          {truncateContent(recipe.content)}
        </p>

        <div className="flex items-center text-gray-500 text-sm space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>

        {/* Delete Button */}
        <button
          className="absolute top-4 right-4 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={handleDeleteClick}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Delete Confirmation Overlay */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white bg-opacity-95 z-10 flex flex-col items-center justify-center text-center p-4">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Confirm Deletion
          </h4>
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete this recipe?
          </p>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={cancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
