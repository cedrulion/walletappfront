import React, { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionsList from '../components/TransactionsList';
import BudgetTracker from '../components/BudgetTracker';
import VisualSummary from '../components/VisualSummary';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login'); 
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleCreateAccountRedirect = () => {
    navigate('/create-account'); 
  };

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
          <TransactionForm onTransactionAdded={() => window.location.reload()} />
          <TransactionsList />
          <BudgetTracker />
          <VisualSummary />
        </>
      ) : (
        <div className="text-center mt-20">
          <h1 className="text-2xl font-bold mb-4">No account found</h1>
          <button
            onClick={handleCreateAccountRedirect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
