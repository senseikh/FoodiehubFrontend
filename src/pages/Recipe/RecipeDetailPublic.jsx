import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  ArrowLeft,
  MessageSquare,
  Send,
  RefreshCw,
  User,
} from "lucide-react";
import Api from "../../api";

const RecipeDetailPublic = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    fetchRecipeDetails();
    fetchComments();
    checkAuthStatus();
  }, [id]);

  const checkAuthStatus = async () => {
    try {
      // You can use any endpoint that requires authentication
      // and check if it succeeds
      await Api.get("/api/auth/user/");
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const fetchRecipeDetails = () => {
    Api.get(`/api/recipes/${id}/`)
      .then((res) => {
        console.log("Full API Response:", res);
        console.log("Response Data:", res.data);
        setRecipe(res.data);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        console.error("Error Response:", error.response);
        alert(
          `Failed to fetch recipe: ${
            error.response?.data?.detail || "Unknown error"
          }`
        );
      });
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await Api.get(`/api/recipes/${id}/comments/`);
      setComments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setCommentError("Failed to load comments");
    } finally {
      setLoadingComments(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      Api.delete(`/api/recipes/${id}/`)
        .then(() => {
          navigate("/dashboard/home");
        })
        .catch(() => alert("Failed to delete recipe"));
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    // For anonymous users, validate guest name
    if (!isAuthenticated && !guestName.trim()) {
      setCommentError("Please provide your name to comment");
      return;
    }

    try {
      setSubmittingComment(true);
      setCommentError("");

      const commentData = {
        content: newComment.trim(),
      };

      // Add guest_name for anonymous users
      if (!isAuthenticated) {
        commentData.guest_name = guestName.trim();
      }

      const response = await Api.post(
        `/api/recipes/${id}/comments/`,
        commentData
      );

      // Add new comment to the list
      setComments([...comments, response.data]);
      setNewComment(""); // Clear input
    } catch (error) {
      console.error("Error submitting comment:", error);
      setCommentError(
        error.response?.data?.detail || "Failed to submit comment"
      );
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (!recipe)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg border border-gray-300 shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = "https://via.placeholder.com/600x400";
          }}
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
          <p className="mt-4 text-gray-600">{recipe.content}</p>

          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/recipes/public"
              className="flex items-center text-gray-500 hover:text-gray-700 transition"
            >
              <ArrowLeft size={18} className="mr-2" />{" "}
              <span>Back to Recipes</span>
            </Link>
          </div>

          {/* Comments Section */}
          <div className="mt-10 border-t pt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <MessageSquare className="mr-2" size={20} />
              Comments
            </h2>

            {/* Comments List */}
            <div className="space-y-4 mb-8">
              {loadingComments ? (
                <div className="flex justify-center py-4">
                  <RefreshCw className="animate-spin text-blue-500" size={24} />
                </div>
              ) : comments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <User size={16} className="text-blue-600" />
                      </div>
                      <span className="font-medium text-sm ml-2">
                        {comment.user?.username ||
                          comment.guest_name ||
                          "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-700 pl-8">{comment.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mt-6">
              {commentError && (
                <p className="text-red-500 text-sm mb-2">{commentError}</p>
              )}

              {/* Guest name field for anonymous users */}
              {!isAuthenticated && (
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
                    placeholder="Your Name (required)"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    disabled={submittingComment}
                  />
                </div>
              )}

              <div className="flex">
                <textarea
                  className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none resize-none"
                  rows="2"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={submittingComment}
                ></textarea>
                <button
                  type="submit"
                  disabled={
                    submittingComment ||
                    !newComment.trim() ||
                    (!isAuthenticated && !guestName.trim())
                  }
                  className={`bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-r-lg ${
                    submittingComment ||
                    !newComment.trim() ||
                    (!isAuthenticated && !guestName.trim())
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {submittingComment ? (
                    <RefreshCw className="animate-spin" size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPublic;
