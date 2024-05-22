// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/balance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: user.username })
        });
        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    if (user) {
      fetchBalance();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Welcome, {user ? user.username : 'loading...'}</h1>
      {balance !== null && (
        <p className="mb-4">Balance: ${balance}</p>
      )}
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg mr-2 focus:outline-none hover:bg-gray-300">
          Back
        </button>
        <button onClick={() => navigate('/transaction')} className="bg-blue-500 text-white px-3 py-2 rounded-lg focus:outline-none hover:bg-blue-600">
          Transfer Money
        </button>
        <button onClick={() => navigate('/transaction-history')} className="bg-blue-500 text-white px-3 py-2 rounded-lg ml-2 focus:outline-none hover:bg-blue-600">
          View Transactions
        </button>
      </div>
      <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded-lg focus:outline-none hover:bg-red-600">
        Logout
      </button>
    </div>
  );
};

export default Dashboard