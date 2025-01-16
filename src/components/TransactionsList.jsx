import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {

        const { data } = await fetchTransactions();
        
        const userId = JSON.parse(localStorage.getItem('user'))?.id; 
        console.log('User ID from localStorage:', userId);

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

 
        const filteredData = data.filter((txn) => txn.account?._id.toString() === userId);

        console.log('Filtered transactions:', filteredData);


        setTransactions(filteredData);
        setFilteredTransactions(filteredData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setTransactionType(selectedType);


    if (selectedType) {
      const filtered = transactions.filter((txn) => txn.type === selectedType);
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); 
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-4">Transaction List</h2>

      <div className="mb-4">
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

      <ul>
        {filteredTransactions.map((txn) => (
          <li key={txn._id} className="border-b py-2">
            <span>{txn.type}</span>: <span>{txn.amount}</span> 
            <span className="ml-3">{txn.category ? txn.category.name : ''}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
