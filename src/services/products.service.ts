import axios from 'axios';
import { GLOBALS } from '../config/config';

export const getProducts = async () => {
  const response = await axios.get(`${GLOBALS.API_HOST}/api/products`);
  return response.data;
};

export const getProductsFiltrated = async (from: number, to: number, criteria: string) => {
  const response = await axios.post(`${GLOBALS.API_HOST}/api/products/filtration`, {
    from: from,
    to: to,
    search_criteria: criteria,
  });
  return response.data;
};

// export const getPageproducts = async (page: number) => {
//   const response = await axios.get(`${GLOBALS.API_HOST}/api/products/${page}`);
//   return response.data;
// };

export const getProductImage = async (serial: number) => {
  const response = await axios.get(`${GLOBALS.API_HOST}/api/products/image/${serial}`);
  return response.data;
};
