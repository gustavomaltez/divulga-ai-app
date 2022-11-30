import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { api } from '@services';

function createFakeTransactions() {
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const types = ['deposit', 'withdraw'];
  const descriptions = ['Salary', 'Bonus', 'Gift', 'Rent', 'Food', 'Clothes', 'Transport', 'Health', 'Entertainment', 'Other'];
  months.forEach(month => {
    types.forEach(type => {
      const amount = Math.floor(Math.random() * 10000);
      const description = descriptions[Math.floor(Math.random() * descriptions.length)];
      const date = new Date(2022, month, 5).toISOString();
      const transaction = { type, amount, description, date };
      api.post('/transaction', transaction);
    });
  }
  );
}

function logout() {
  localStorage.clear();
  window.location.reload();
}

if (typeof window !== 'undefined') {
  (window as any).createFakeTransactions = createFakeTransactions;
  (window as any).logout = logout;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
