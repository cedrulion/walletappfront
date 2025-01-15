import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../services/api';

const BudgetTracker = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const calculateExpenses = async () => {
      try {
        const { data } = await fetchTransactions();

        // Get the user ID from localStorage
        const userId = JSON.parse(localStorage.getItem('user'))?.id; // Assuming user object has 'id'
        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        // Filter transactions based on account ID matching the user's ID
        const filteredTransactions = data.filter(
          (txn) => txn.account?._id.toString() === userId && txn.type === 'Expense'
        );

        // Calculate total expenses
        const totalExpenses = filteredTransactions.reduce((acc, curr) => acc + curr.amount, 0);

        setExpenses(totalExpenses);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    calculateExpenses();
  }, []);

  const handleSetBudget = (e) => {
    e.preventDefault();
    alert(`Budget set to ${budget}`);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-4">Budget Tracker</h2>
      <form onSubmit={handleSetBudget} className="mb-4">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          placeholder="Set your budget"
          className="p-2 border rounded w-full mb-4"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Set Budget
        </button>
      </form>
      <div>
        <p>
          Total Expenses: <span className="font-bold">${expenses}</span>
        </p>
        {expenses > budget && budget > 0 ? (
          <p className="text-red-600 font-bold">
            Alert: Your expenses have exceeded the budget!
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default BudgetTracker;
