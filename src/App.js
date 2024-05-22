// src/App.js
import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Transaction from './components/Transaction';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <AuthProvider>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/"  element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/transaction" element={<Transaction/>} />
          <Route path="/transaction-history" element={<TransactionHistory/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
