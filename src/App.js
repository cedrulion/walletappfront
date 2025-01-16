import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import AccountList from './components/AccountList';
import CreateCategory from './pages/CreateCategoryPage';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions'; 
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<CreateAccount />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/account" element={<AccountList />} />
      <Route path="/create-category" element={<CreateCategory />} />
    </Routes>
  </Router>
);

export default App;
