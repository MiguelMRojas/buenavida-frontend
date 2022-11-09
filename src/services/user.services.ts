import axios from 'axios';
import { GLOBALS } from '../config/config';
import { ISignupPayload } from '../interfaces/interfaces.services';
import { RefreshTokenService } from './session.services';

// Create a new user on database
export const SignupService = async (payload: ISignupPayload) => {
  try {
    const response = await axios.post(`${GLOBALS.API_HOST}/api/user`, payload);

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response;
    return new axios.AxiosError().response;
  }
};

// Get detailed favorites (For /favorites route)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GetDetailedFavoritesService = async (it: number): Promise<any> => {
  if (it > 2) return new axios.AxiosError().response;

  try {
    const response = await axios.get(`${GLOBALS.API_HOST}/api/user/favorites/detailed`, {
      withCredentials: true,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Error caused because of no access-token provided
      if (err.response?.status === 403) {
        await RefreshTokenService();
        return await GetDetailedFavoritesService(++it); // Try one more time
      }

      return err.response;
    }
    return new axios.AxiosError().response;
  }
};
