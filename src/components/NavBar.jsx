import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between">
      <h1 className="text-xl font-bold">Wallet App</h1>
      <div>
        <Link className="px-4" to="/">Dashboard</Link>
        <Link className="px-4" to="/transactions">Transactions</Link>
        <Link className="px-4" to="/reports">Reports</Link>
        <Link className="px-4" to="/account">Profile</Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
