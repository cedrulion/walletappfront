import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/api'; 

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data); 
      } catch (err) {
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);


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

const handleEdit = (categoryId) => {
  console.log(`Editing category with ID: ${categoryId}`);

};


const handleDelete = async (categoryId) => {

  console.log(`Deleting category with ID: ${categoryId}`);
};

export default CategoryList;
