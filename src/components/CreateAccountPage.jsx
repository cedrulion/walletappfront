import React, { useState } from 'react';
import { createAccount } from '../services/api';  // Import createAccount from your API services
import { useHistory } from 'react-router-dom';

const CreateAccountPage = () => {
  // State to store form input values
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [balance, setBalance] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const history = useHistory();

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Reset error and success states
    setError('');
    setSuccess(false);

    try {
      const accountData = { name, type, balance };

      // Use createAccount function from the API service
      await createAccount(accountData);

      // If the request is successful, show success message
      setSuccess(true);
      setName('');
      setType('');
      setBalance('');

      // Optionally, redirect to the accounts list page or another page after success
      history.push('/accounts');
    } catch (err) {
      // Handle errors
      setError('Error creating account. Please try again.');
      console.error('Error creating account:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-md mt-8">
      <h2 className="text-2xl font-semibold text-center mb-4">Create New Account</h2>

      {/* Show success message */}
      {success && <p className="text-green-500 text-center mb-4">Account created successfully!</p>}

      {/* Show error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleFormSubmit}>
        {/* Account Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Account Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Account Type */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Type</option>
            <option value="Savings">Savings</option>
            <option value="Checking">Checking</option>
          </select>
        </div>

        {/* Account Balance */}
        <div className="mb-4">
          <label htmlFor="balance" className="block text-sm font-medium text-gray-700">
            Balance
          </label>
          <input
            type="number"
            id="balance"
            name="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountPage;
