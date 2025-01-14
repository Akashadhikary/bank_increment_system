import axios from 'axios';

const API_URL = 'http://localhost:5001/api/customers';

const createCustomer = async (data) => {
  const response = await axios.post(`${API_URL}/create`, data);
  return response.data;
};

const getCustomers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export default { createCustomer, getCustomers };
