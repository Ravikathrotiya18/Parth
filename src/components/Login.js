// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, pin);
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl mb-6 text-center font-semibold text-gray-800">Login</h2>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">PIN</label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
