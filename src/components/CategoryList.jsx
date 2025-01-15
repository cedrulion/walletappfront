import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api'; // Make sure this points to your API service

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);  // Assuming the categories are returned in 'data'
      } catch (err) {
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // Render loading, error, or categories
  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left border-b">Category Name</th>
            <th className="py-2 px-4 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td className="py-2 px-4 border-b">{category.name}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEdit(category._id)}
                >
                  Edit
                </button>
                <button
                  className="ml-4 text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Handle edit functionality (you can add this function to navigate to an edit page)
const handleEdit = (categoryId) => {
  console.log(`Editing category with ID: ${categoryId}`);
  // Navigate to the edit page or show an edit modal
};

// Handle delete functionality (make sure to confirm before deleting)
const handleDelete = async (categoryId) => {
  // Implement delete logic here (e.g., calling delete API endpoint)
  console.log(`Deleting category with ID: ${categoryId}`);
};

export default CategoryList;
