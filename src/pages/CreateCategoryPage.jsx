import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createCategory, fetchCategories } from '../services/api';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [subcategoryInput, setSubcategoryInput] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedPredefinedCategory, setSelectedPredefinedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);

  const navigate = useNavigate(); 

  const predefinedCategories = [
    {
      name: 'Food & Dining',
      subcategories: ['Groceries', 'Restaurants', 'Coffee Shops'],
    },
    {
      name: 'Transportation',
      subcategories: ['Fuel', 'Public Transport', 'Taxi'],
    },
    {
      name: 'Entertainment',
      subcategories: ['Movies', 'Music', 'Games'],
    },
    {
      name: 'Utilities',
      subcategories: ['Electricity', 'Water', 'Internet'],
    },
    {
      name: 'Healthcare',
      subcategories: ['Doctor Visits', 'Medicines', 'Insurance'],
    },
  ];

  const getCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName) {
      setMessage('Category name is required!');
      return;
    }

    try {
      const response = await createCategory({ name: categoryName, subcategories });
      if (response.data) {
        setMessage('Category created successfully!');
        getCategories();
        setCategoryName('');
        setSubcategories([]);
        setSelectedPredefinedCategory('');
        setTimeout(() => navigate('/login'), 1500); 
      }
    } catch (error) {
      setMessage('Error creating category');
      console.error('Error creating category', error);
    }
  };

  const handlePredefinedCategorySelect = (e) => {
    const selectedCategory = predefinedCategories.find(
      (cat) => cat.name === e.target.value
    );
    if (selectedCategory) {
      setCategoryName(selectedCategory.name);
      setSubcategories(selectedCategory.subcategories);
    } else {
      setCategoryName('');
      setSubcategories([]);
    }
    setSelectedPredefinedCategory(e.target.value);
  };

  const handleAddSubcategory = () => {
    if (subcategoryInput.trim()) {
      setSubcategories((prev) => [...prev, subcategoryInput.trim()]);
      setSubcategoryInput('');
    }
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage Your Expenses Categories</h2>
      <p className="text-gray-600 text-center mb-6">
        Start by selecting a predefined category or creating your own custom category to organize your expenses.
      </p>

  
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Category</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Select Predefined Category</label>
            <select
              value={selectedPredefinedCategory}
              onChange={handlePredefinedCategorySelect}
              className="w-full p-2 border rounded"
            >
              <option value="">Choose a predefined category</option>
              {predefinedCategories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
              <option value="custom">Create Your Own</option>
            </select>
          </div>

          {selectedPredefinedCategory === 'custom' && (
            <div className="mb-4">
              <label className="block mb-1">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter category name"
                required
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-1">Subcategories</label>
            <input
              type="text"
              value={subcategoryInput}
              onChange={(e) => setSubcategoryInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter subcategory and click Add"
            />
            <button
              type="button"
              onClick={handleAddSubcategory}
              className="mt-2 bg-green-500 text-white p-2 rounded"
            >
              Add Subcategory
            </button>
            <ul className="mt-2">
              {subcategories.map((sub, index) => (
                <li key={index} className="text-gray-700">
                  - {sub}
                </li>
              ))}
            </ul>
          </div>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
            Add Category
          </button>
        </form>
        {message && <div className="mt-4 text-center text-red-500">{message}</div>}
      </div>

      {/* Display Existing Categories */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Existing Categories</h3>
        <ul>
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="p-2 border-b">
                {category.name} {category.subcategories && `(${category.subcategories.join(', ')})`}
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
