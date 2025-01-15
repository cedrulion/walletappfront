import React, { useState } from 'react';
import { createCategory, fetchCategories } from '../services/api'; // Importing the API functions

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories to display the existing ones
  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  // Handle form submission to create a new category
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      setMessage('Category name is required!');
      return;
    }

    try {
      const response = await createCategory({ name: categoryName, subcategories: subcategories });
      if (response.data) {
        setMessage('Category created successfully!');
        getCategories(); 
        setCategoryName(''); 
        setSubcategories('');
      }
    } catch (error) {
      setMessage('Error creating category');
      console.error('Error creating category', error);
    }
  };

  // Use useEffect or button to load categories on page load
  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Create Category</h2>

      {/* Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Subcategory</label>
            <input
              type="text"
              value={subcategories}
              onChange={(e) => setSubcategories(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Add Category
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-red-500">
            {message}
          </div>
        )}
      </div>

      {/* Display Existing Categories */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Existing Categories</h3>
        <ul>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="p-2 border-b">
                {category.name}
              </li>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategory;
