import React from 'react';
import { FaCheckCircle, FaUserShield, FaListAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to WalletApp</h1>
        <p className="text-lg mb-6">
          Track, organize, and manage your financial transactions with ease.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg shadow hover:bg-gray-200"
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: FaUserShield, title: 'User Authentication', description: 'Secure login and access.' },
            { icon: FaListAlt, title: 'Transaction Categories', description: 'Organize by type and category.' },
            { icon: FaMoneyBillWave, title: 'Account Management', description: 'Track by multiple accounts.' },
            { icon: FaCheckCircle, title: 'Detailed Reporting', description: 'Visualize financial trends.' },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white shadow p-6 rounded-lg text-center">
              <Icon className="text-blue-600 text-4xl mb-4" />
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-blue-100 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            'Sign Up and Log In',
            'Add Your Accounts',
            'Track Your Transactions',
          ].map((step, index) => (
            <div key={index} className="bg-white shadow p-6 rounded-lg">
              <div className="text-blue-600 text-4xl font-bold mb-4">{index + 1}</div>
              <p className="text-lg font-bold">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
