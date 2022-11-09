import axios from 'axios';
import { GLOBALS } from '../config/config';
import { RefreshTokenService } from './session.services';

// Make an order from the items on cart
export const OrderService = async (it: number): Promise<boolean> => {
  if (it > 2) return false;

  try {
    await axios.post(
      `${GLOBALS.API_HOST}/api/order`,
      {},
      {
        withCredentials: true,
      },
    );

    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 403) {
        await RefreshTokenService();
        return await OrderService(++it);
      }
      return false;
    }
    return false;
  }
};
