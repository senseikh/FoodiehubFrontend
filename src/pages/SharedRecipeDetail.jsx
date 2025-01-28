import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, User, Clock } from "lucide-react";
import Api from "../api";

const SharedRecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecipeAndComments();
  }, [id]);

  const fetchRecipeAndComments = async () => {
    try {
      const recipeResponse = await Api.get(`/recipes/${id}/`);
      setRecipe(recipeResponse.data);

      const commentsResponse = await Api.get(`/recipes/${id}/comments/`);
      setComments(commentsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await Api.post(`/recipes/${id}/comments/`, {
        content: newComment,
        recipe: id,
      });
      setNewComment("");
      fetchRecipeAndComments(); // Refresh comments
    } catch (error) {
      alert("Error posting comment: " + error.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await Api.delete(`/comments/${commentId}/delete/`);
      fetchRecipeAndComments(); // Refresh comments
    } catch (error) {
      alert("Error deleting comment: " + error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {recipe && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {recipe.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <User className="w-4 h-4 mr-2" />
                <span>By {recipe.author}</span>
                <Clock className="w-4 h-4 ml-4 mr-2" />
                <span>{new Date(recipe.created_at).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-line">
                {recipe.content}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
            Comments
          </h2>

          <form onSubmit={handleSubmitComment} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring focus:ring-blue-300 focus:border-blue-500"
              rows="3"
              required
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-700">
                      {comment.author}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  {comment.can_delete && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <p className="mt-2 text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedRecipeDetail;
