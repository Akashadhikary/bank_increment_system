import React, { useState, useEffect } from 'react';
import customerService from '../services/customerService';

const AccountForm = () => {
  const [formData, setFormData] = useState({ accountId: '', introducerId: '' });
  const [message, setMessage] = useState('');
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await customerService.getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, [customers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.accountId || !formData.introducerId) {
      setMessage('Account ID and Introducer ID are required');
      return;
    }

    try {
      console.log('Form data to send:', formData);
      const response = await customerService.createCustomer(formData);
      setMessage("Account created successfully!");
      setFormData({ accountId: '', introducerId: '' });
    } catch (error) {
      console.error('Error creating customer:', error);
      setMessage('Error creating account');
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Account ID</label>
          <input
            type="number"
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Introducer ID</label>
          <input
            type="number"
            name="introducerId"
            value={formData.introducerId}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Submit
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}

      {/* Displaying customer list in a table */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Customer List</h3>
        <table className="w-full table-auto mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Account ID</th>
              <th className="border px-4 py-2">Introducer ID</th>
              <th className="border px-4 py-2">Beneficiary ID</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.accountId}>
                <td className="border px-4 py-2">{customer.accountId}</td>
                <td className="border px-4 py-2">{customer.introducerId}</td>
                <td className="border px-4 py-2">{customer.beneficiaryId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountForm;
