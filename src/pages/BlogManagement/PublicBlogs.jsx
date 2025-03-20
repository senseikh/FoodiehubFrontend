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

const PublicBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchPublicBlogs = async () => {
      try {
        setLoading(true);
        const response = await Api.get("/api/blogs/public/");
        const data = Array.isArray(response.data) ? response.data : [];
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (error) {
        console.error("Error fetching public blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, blogs]);

  const getAuthorDisplay = (author) => {
    if (!author) return "Unknown Author";
    if (typeof author === "string") return author;
    if (typeof author === "object") {
      return (
        author.username ||
        author.name ||
        "Author #" + author.id ||
        "Unknown Author"
      );
    }
    return "Unknown Author";
  };

  const getCommentCount = (blog) => {
    if (!blog.comments) return 0;
    return Array.isArray(blog.comments) ? blog.comments.length : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mt-12 container mx-auto py-8 px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              <Book className="inline-block mr-2 mb-1" size={24} /> Public Blogs
            </h1>
            <p className="text-gray-600 mt-1">Discover public Blogs</p>
          </div>

          <div className="relative w-full md:w-64 lg:w-96">
            <input
              type="text"
              placeholder="Search blogs..."
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
            <p className="text-gray-600">Loading blogs...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">
              No blogs found. Try a different search term or check back later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {blog.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <User size={14} className="mr-1" />
                    <span>{getAuthorDisplay(blog.author)}</span>

                    <div className="ml-4 flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      <span>{getCommentCount(blog)}</span>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${blog.id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm mt-2"
                  >
                    View Blog
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

export default PublicBlogs;
