import axios from 'axios';
import { GLOBALS } from '../config/config';

export const getProducts = async () => {
  const response = await axios.get(`${GLOBALS.API_HOST}/api/products`);
  return response.data;
};
