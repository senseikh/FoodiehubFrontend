import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Share2, X } from "lucide-react";
import Api from "../../api";

const ShareRecipeForm = ({ id, recipe }) => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async (e) => {
    e.preventDefault();
    setIsSharing(true);

    try {
      // First, add the comment if provided
      if (comment.trim()) {
        await Api.post(`/api/recipes/${id}/comments/`, {
          content: comment,
          recipe: id,
        });
      }

      // Then share the recipe
      await Api.put(`/api/recipes/${id}/share/`);

      // Navigate to the shared recipe view
      navigate(`/recipes/shared/${id}`);
    } catch (error) {
      console.error("Error sharing recipe:", error);
      alert("Failed to share recipe. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Share2 className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Share Recipe</h2>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleShare} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">
              Recipe: {recipe?.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>Add a comment before sharing (optional)</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your thoughts about this recipe..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 
                         focus:outline-none min-h-[100px] resize-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 
                       transition-colors duration-200 flex items-center gap-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                       transition-colors duration-200 flex items-center gap-2 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Share2 className="w-4 h-4" />
              {isSharing ? "Sharing..." : "Share Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareRecipeForm;
