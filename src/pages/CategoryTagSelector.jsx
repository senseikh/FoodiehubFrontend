import React, { useState, useEffect } from "react";
import { Tag as TagIcon } from "lucide-react";
import Api from "../api";

const CategoryTagSelector = ({
  selectedCategories,
  selectedTags,
  onChange,
}) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          Api.get("/categories/"),
          Api.get("/tags/"),
        ]);
        setCategories(categoriesRes.data);
        setTags(tagsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories and tags:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (categoryId) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
    onChange("categories", newCategories);
  };

  const handleTagChange = (tagId) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];
    onChange("tags", newTags);
  };

  if (loading) {
    return <div>Loading categories and tags...</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategories.includes(category.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-2 flex items-center">
          <TagIcon className="w-4 h-4 mr-2" />
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => handleTagChange(tag.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag.id)
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTagSelector;
