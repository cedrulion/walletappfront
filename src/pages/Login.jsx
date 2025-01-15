import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 
  
    try {
      
      const response = await login(email, password);
      
      const { token, user } = response.data; 
  
      if (!token || !user) {
        throw new Error('No token or user data received.');
      }
  
     
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); 
  
      console.log('Login successful');
      console.log('Token:', token);
      console.log('User:', user);
  
      
      navigate('/dashboard');
    } catch (err) {
      
      const errorMessage =
        err.response?.data?.message || err.message || 'Login failed, please try again.';
      
      setError(errorMessage); 
      console.error('Login error:', err); 
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
          <p className="text-sm text-center mt-4 ">
            Already have an account?{' '}
            <a href="/create-account" className="hover:underline">
              SignUp
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
