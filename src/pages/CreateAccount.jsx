import React, { useState } from 'react';
import { createAccount } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const [accountName, setAccountName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const newAccount = {
        name: accountName,
        type: accountType,
        email: email,
        password: password,
        balance: parseFloat(accountBalance),
      };

      // Call the API to create the account
      const response = await createAccount(newAccount);

      // Save the account ID to localStorage
      localStorage.setItem('userAccount', JSON.stringify(response.data));

      // Navigate to Dashboard
      navigate('/dashboard');
      alert('Account created successfully!');
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleCreateAccount}>
        <div className="mb-2">
          <label htmlFor="accountName" className="block">Account Name</label>
          <input
            type="text"
            id="accountName"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="accountType" className="block">Account Type</label>
          <select
            id="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Bank">Bank</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="accountBalance" className="block">Balance</label>
          <input
            type="number"
            id="accountBalance"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          disabled={isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
