import React, { useState } from "react";
import { Share2, Lock, Globe } from "lucide-react";
import Api from "../api";

const RecipeSharing = ({ recipeId, isShared, onShareStatusChange }) => {
  const [sharing, setSharing] = useState(isShared);
  const [loading, setLoading] = useState(false);

  const toggleSharing = async () => {
    setLoading(true);
    try {
      const response = await Api.patch(`/recipes/${recipeId}/`, {
        is_shared: !sharing,
      });

      if (response.status === 200) {
        setSharing(!sharing);
        if (onShareStatusChange) {
          onShareStatusChange(!sharing);
        }
      }
    } catch (error) {
      console.error("Error toggling recipe sharing:", error);
      alert("Failed to update sharing status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={toggleSharing}
        disabled={loading}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
          sharing
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {sharing ? (
          <>
            <Globe className="w-4 h-4 mr-2" />
            Public
          </>
        ) : (
          <>
            <Lock className="w-4 h-4 mr-2" />
            Private
          </>
        )}
      </button>
      {sharing && (
        <div className="text-sm text-gray-500 flex items-center">
          <Share2 className="w-4 h-4 mr-1" />
          <span>Recipe is shared publicly</span>
        </div>
      )}
    </div>
  );
};

export default RecipeSharing;
