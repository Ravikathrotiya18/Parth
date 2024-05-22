// src/components/TransactionHistory.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/transaction-history/${user.username}`);
        const data = await response.json();
        setTransactions(data);
        } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    if (user) {
      fetchTransactionHistory();
    }
  }, [user]);

  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg focus:outline-none hover:bg-gray-300">
          Back
        </button>
        <h2 className="text-3xl ml-4 font-semibold text-gray-800">Transaction History</h2>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border border-gray-200">
            <th className="p-2 border border-gray-200">Date</th>
            <th className="p-2 border border-gray-200">Amount</th>
            <th className="p-2 border border-gray-200">Receiver</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
              <td className="p-2 border border-gray-200">{transaction.date}</td>
              <td className="p-2 border border-gray-200">${transaction.amount}</td>
              <td className="p-2 border border-gray-200">{transaction.receiver}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
