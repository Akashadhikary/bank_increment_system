import React from 'react';
import AccountForm from './components/AccountForm';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bank Promotion Plan</h1>
      <AccountForm />
    </div>
  );
};

export default App;
