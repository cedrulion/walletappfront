import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';
import { format } from 'date-fns';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState(''); // Track selected filter (Income or Expense)

  // Fetch transactions from the API
  useEffect(() => {
    const getTransactions = async () => {
      try {
        // Fetch transactions from the API
        const { data } = await fetchTransactions();

        // Get the user ID from localStorage
        const userId = JSON.parse(localStorage.getItem('user'))?.id; // Assuming the user object has 'id'
        console.log('User ID from localStorage:', userId);

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        // Filter transactions based on account ID (ensure txn.account is converted to string)
        const filteredData = data.filter((txn) => txn.account?._id.toString() === userId);

        console.log('Filtered transactions:', filteredData);

        // Set the state with all filtered transactions
        setTransactions(filteredData);
        setFilteredTransactions(filteredData); // Initialize filtered transactions with all data
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    getTransactions();
  }, []);

  // Handle filter change based on transaction type (Income or Expense)
  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setTransactionType(selectedType);

    // Filter transactions by type if a filter is selected
    if (selectedType) {
      const filtered = transactions.filter((txn) => txn.type === selectedType);
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); // Show all transactions if no filter is selected
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="transactionType" className="mr-2">Filter by Type:</label>
        <select
          id="transactionType"
          value={transactionType}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      {/* Transaction List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Transaction List</h3>
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
              <th className="p-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id} className="border-b">
                  <td className="p-2">{format(new Date(transaction.date), 'MM/dd/yyyy')}</td>
                  <td className="p-2">${transaction.amount}</td>
                  <td className="p-2">{transaction.type}</td>
                  <td className="p-2">{transaction.category ? transaction.category.name : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-2 text-center">No transactions available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
