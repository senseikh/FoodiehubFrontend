import { useState, useEffect } from "react";
import Api from "../../api";
import { Send, RefreshCw, MessageSquare, User } from "lucide-react";
// import { useAuth } from "../../contexts/AuthContext"; // Assuming you have an auth context

const RecipeComments = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth(); // Get authentication status

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await Api.get(`/api/recipes/${recipeId}/comments/`);
      setComments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      setError("");

      if (!isAuthenticated) {
        setError("You must be logged in to comment");
        return;
      }

      const response = await Api.post(`/api/recipes/${recipeId}/comments/`, {
        content: comment.trim(),
      });

      // Add new comment to the list
      setComments([...comments, response.data]);
      setComment(""); // Clear input
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError(
        error.response?.data?.detail ||
          "Failed to submit comment. Please try again."
      );
    } finally {
      setSubmitting(false);
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

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <MessageSquare className="mr-2" size={20} />
        Comments
      </h3>

      {/* Comments list */}
      <div className="space-y-4 mb-6">
        {loading ? (
          <div className="flex justify-center py-4">
            <RefreshCw className="animate-spin text-indigo-600" size={24} />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-3">
              <div className="flex items-center mb-1">
                <div className="bg-indigo-100 rounded-full p-1">
                  <User size={14} className="text-indigo-700" />
                </div>
                <span className="font-medium text-sm ml-2">
                  {comment.user?.username || "Anonymous"}
                </span>
                <span className="text-xs text-gray-500 ml-2">
                  {formatDate(comment.created_at)}
                </span>
              </div>
              <p className="text-gray-700 pl-6">{comment.content}</p>
            </div>
          ))
        )}
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="mt-4">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex items-center">
          <textarea
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
            rows="2"
            placeholder={
              isAuthenticated ? "Add a comment..." : "Sign in to comment"
            }
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!isAuthenticated || submitting}
          ></textarea>
          <button
            type="submit"
            disabled={!isAuthenticated || submitting || !comment.trim()}
            className={`bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-r-lg ${
              !isAuthenticated || submitting || !comment.trim()
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {submitting ? (
              <RefreshCw className="animate-spin" size={20} />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeComments;
