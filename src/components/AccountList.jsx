import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { fetchAccounts } from '../services/api';

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountTypeFilter, setAccountTypeFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const response = await fetchAccounts();
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (!userId) {
          setError('User ID not found in localStorage');
          setLoading(false);
          return;
        }

        const userData = response.data.find((user) => user._id === userId);

        if (userData) {
          setAccounts(userData.accounts);  
          setFilteredAccounts(userData.accounts);
        }

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

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setAccountTypeFilter(selectedType);

    if (selectedType) {
      const filtered = accounts.filter((account) => account.type === selectedType);
      setFilteredAccounts(filtered);
    } else {
      setFilteredAccounts(accounts);
    }
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
      <div className="mb-4">
        <label htmlFor="accountType" className="mr-2">Filter by Account Type:</label>
        <select
          id="accountType"
          value={accountTypeFilter}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Bank">Bank</option>
          <option value="Mobile Money">Mobile Money</option>
        </select>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Account Type</th>
            <th className="px-4 py-2 border-b">Balance</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <tr key={account._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{account.type}</td>
                <td className="px-4 py-2 border-b">{account.balance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="p-2 text-center">No accounts available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
