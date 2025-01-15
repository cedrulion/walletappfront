import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch transactions from the API
        const { data } = await fetchTransactions();
        
        // Get the user ID from localStorage
        const userId = JSON.parse(localStorage.getItem('user'))?.id;  // Assuming the user object has 'id'
        console.log('User ID from localStorage:', userId);

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        // Filter transactions based on account ID (ensure txn.account is converted to string)
        const filteredTransactions = data.filter((txn) => txn.account?._id.toString() === userId);

        console.log('Filtered transactions:', filteredTransactions);

        // Update the state with the filtered transactions
        setTransactions(filteredTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-4">Transaction List</h2>
      <ul>
        {transactions.map((txn) => (
          <li key={txn._id} className="border-b py-2">
            <span>{txn.type}</span>: <span>{txn.amount}</span> 
            <span className='ml-3'>{txn.category ? txn.category.name : ''}</span>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
