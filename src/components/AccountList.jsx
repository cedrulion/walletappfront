import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccounts } from '../services/api';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await fetchAccounts();
        const userId = JSON.parse(localStorage.getItem('user'))?.id;

        if (!userId) {
          setError('User ID not found in localStorage');
          setLoading(false);
          return;
        }

        const filteredAccounts = response.data.filter((account) => account._id === userId);
        setAccounts(filteredAccounts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load accounts');
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Account List</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Account Name</th>
            <th className="px-4 py-2 border-b">Account Type</th>
            <th className="px-4 py-2 border-b">Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{account.name}</td>
              <td className="px-4 py-2 border-b">{account.type}</td>
              <td className="px-4 py-2 border-b">{account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
