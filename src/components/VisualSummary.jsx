import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const VisualSummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
     
        const response = await axios.get('https://walletapp-9wli.onrender.com/api/transactions'); 
        const data = response.data;

        
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;

        if (!userId) {
          console.error('User ID not found in localStorage');
          setError('User not logged in or invalid');
          setLoading(false);
          return;
        }

       
        const filteredTransactions = data.filter(
          (txn) => txn.account?._id.toString() === userId
        );

        setTransactions(filteredTransactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Failed to fetch transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  
  const categories = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'Income') {
        acc.income += transaction.amount;
      } else if (transaction.type === 'Expense') {
        acc.expenses += transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Transactions',
        data: [categories.income, categories.expenses],
        backgroundColor: ['#4CAF50', '#FF5733'],
        hoverBackgroundColor: ['#45a049', '#ff331f'],
        borderColor: ['#2e7d32', '#c62828'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction Summary</h2>
      <div className="h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default VisualSummary;
