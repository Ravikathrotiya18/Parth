// src/components/Transaction.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sender: user.username, receiver, amount })
      });

      const data = await response.json();
      alert(data.message);
      if(data.success){
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Error occurred during transaction:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl mb-6 text-center font-semibold text-gray-800">Transfer Money</h2>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700">Receiver</label>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
          />
        </div>
        <button type="submit" className="w-full py-3 mt-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default Transaction;
