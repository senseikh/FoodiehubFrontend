import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../../api";
import { Trash, Pencil, Plus } from "lucide-react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Api.get("api/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await Api.delete(`api/categories/${id}/`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link
            to="new"
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Plus size={16} /> Create Category
          </Link>
        </div>
        {categories.length > 0 ? (
          <ul className="space-y-4">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <span className="font-medium">{category.name}</span>
                <div className="flex gap-2">
                  <button
                    className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => navigate(`/categories/${category.id}`)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="p-2 border rounded bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
