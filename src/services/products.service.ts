import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get('http://localhost:3030/products');
  return response.data;
};
