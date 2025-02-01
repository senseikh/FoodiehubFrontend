import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Edit, Trash2, ArrowLeft } from "lucide-react"; // Import Lucide React icons
import Api from "../api";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = () => {
    Api.get(`/api/recipes/${id}/`)
      .then((res) => {
        console.log("Full API Response:", res); // Log entire response
        console.log("Response Data:", res.data); // Log response data
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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      Api.delete(`/api/recipes/${id}/`)
        .then(() => {
          navigate("/dashboard/home");
        })
        .catch(() => alert("Failed to delete recipe"));
    }
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
            e.target.src = "https://via.placeholder.com/600x400";
          }}
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
          <p className="mt-4 text-gray-600">{recipe.content}</p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <Link
                to={`/recipes/shared/${id}`}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Edit size={18} /> <span>Share</span>
              </Link>
              <Link
                to={`/dashboard/recipe/${id}/edit`}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                <Edit size={18} /> <span>Edit</span>
              </Link>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                <Trash2 size={18} /> <span>Delete</span>
              </button>
            </div>
            <Link
              to="/dashboard/home"
              className="flex items-center text-gray-500 hover:text-gray-700 transition"
            >
              <ArrowLeft size={18} className="mr-2" />{" "}
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

// import React, { useEffect, useState } from "react";
// import {
//   Edit2,
//   Trash2,
//   Clock,
//   User,
//   BookOpen,
//   ChevronLeft,
// } from "lucide-react";
// import Api from "../api";
// import { useParams, useNavigate, Link } from "react-router-dom";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { toast } from "sonner";

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [recipe, setRecipe] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchRecipeDetails();
//   }, [id]);

//   const fetchRecipeDetails = () => {
//     setIsLoading(true);
//     Api.get(`/api/recipes/${id}/`)
//       .then((res) => {
//         setRecipe(res.data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         toast.error("Failed to fetch recipe details");
//         setIsLoading(false);
//         navigate("/dashboard/home");
//       });
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this recipe?")) {
//       Api.delete(`/api/recipes/${id}/`)
//         .then(() => {
//           toast.success("Recipe deleted successfully");
//           navigate("/dashboard/home");
//         })
//         .catch((err) => {
//           toast.error("Failed to delete recipe");
//         });
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin">
//           <BookOpen size={48} className="text-indigo-500" />
//         </div>
//       </div>
//     );
//   }

//   if (!recipe) return null;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
//       <div className="max-w-4xl mx-auto">
//         <Button
//           variant="outline"
//           size="icon"
//           className="mb-4"
//           onClick={() => navigate("/dashboard/home")}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>

//         <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
//           <CardHeader className="bg-indigo-50 border-b border-indigo-100">
//             <div className="flex items-center space-x-4">
//               <BookOpen className="text-indigo-600" size={32} />
//               <CardTitle className="text-3xl font-bold text-gray-800">
//                 {recipe.title}
//               </CardTitle>
//             </div>
//           </CardHeader>

//           <CardContent className="p-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <div className="flex items-center space-x-2 mb-4">
//                   <User className="text-indigo-500" />
//                   <span className="text-gray-700 font-medium">
//                     Author Details
//                   </span>
//                 </div>
//                 <p className="text-gray-600 mb-4">{recipe.content}</p>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-4">
//                 <div className="flex items-center space-x-2 mb-4">
//                   <Clock className="text-indigo-500" />
//                   <span className="text-gray-700 font-medium">Recipe Info</span>
//                 </div>
//                 <div className="space-y-2">
//                   {/* You can add more recipe details here */}
//                   <p className="text-sm text-gray-600">
//                     Created: {new Date(recipe.created_at).toLocaleDateString()}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Last Updated:{" "}
//                     {new Date(recipe.updated_at).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex space-x-4">
//               <Link to={`/dashboard/recipe/${id}/edit`} className="w-full">
//                 <Button className="w-full" variant="outline">
//                   <Edit2 className="mr-2 h-4 w-4" /> Edit Recipe
//                 </Button>
//               </Link>
//               <Button
//                 variant="destructive"
//                 className="w-full"
//                 onClick={handleDelete}
//               >
//                 <Trash2 className="mr-2 h-4 w-4" /> Delete Recipe
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;
