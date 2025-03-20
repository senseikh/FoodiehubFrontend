// import React, { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";

// import Api from "../../api";
// import Recipe from "../Recipe/Recipe";

// const Blog = () => {
//   const [recipes, setRecipes] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getRecipes();
//   }, []);

//   const getRecipes = () => {
//     Api.get("/api/blogs/")
//       .then((res) => res.data)
//       .then((data) => {
//         setRecipes(data);
//         console.log(data);
//       })
//       .catch((err) => alert(err));
//   };

//   const deleteBlog = (id) => {
//     Api.delete(`/api/blogs/delete/${id}/`)
//       .then((res) => {
//         if (res.status === 204) {
//           alert("Blog Deleted Successfully");
//           getRecipes();
//         } else {
//           alert("Failed to delete");
//         }
//       })
//       .catch((error) =>
//         alert(`Error: ${error.response?.data || error.message}`)
//       );
//   };

//   const navigateToAddRecipe = () => {
//     navigate("/dashboard/add-blog");
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-3xl font-bold text-gray-800">Blogs</h2>
//         <button
//           onClick={navigateToAddRecipe}
//           className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//         >
//           <FiPlus size={20} />
//           <span>Add Blog</span>
//         </button>
//       </div>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {recipes.map((recipe) => (
//           <Recipe recipe={recipe} onDelete={deleteBlog} key={recipe.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Blog;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, Tag } from "lucide-react";
import { FiPlus } from "react-icons/fi";
import Api from "../../api";
import Navbar from "../../components/Navbar";
import CuatomizedNavbar from "../../components/CuatomizedNavbar";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchTerm, blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await Api.get("/api/blogs/");
      setBlogs(response.data);
      setFilteredBlogs(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading blogs...</div>
      </div>
    );
  }

  const handleCardClick = (id) => {
    navigate(`/dashboard/blogs/${id}`);
  };

  const deleteBlog = (id) => {
    Api.delete(`/api/blogs/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Blog Deleted Successfully");
          fetchBlogs();
        } else {
          alert("Failed to delete");
        }
      })
      .catch((error) =>
        alert(`Error: ${error.response?.data || error.message}`)
      );
  };

  const navigateToAddBlog = () => {
    navigate("/dashboard/add-blog");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 via-white to-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800 flex items-center">
            <BookOpen className="w-8 h-8 mr-2" />
            Blog Posts
          </h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500"
            />
          </div>
          <button
            onClick={navigateToAddBlog}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <FiPlus size={20} />
            <span>Add Blog</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => handleCardClick(blog.id)}
              className="cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg border border-gray-300 shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-purple-600">
                    Read more →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
