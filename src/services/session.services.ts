import axios from 'axios';
import { GLOBALS } from '../config/config';
import { ILoginPayload } from '../interfaces/interfaces.services';

// Create the login request to the API to obtain the
// session tokens
// withCredentials field is required
export const LoginService = async (payload: ILoginPayload) => {
  try {
    const response = await axios.post(`${GLOBALS.API_HOST}/api/session/login`, payload, {
      withCredentials: true,
    });

    return response;
  } catch (err) {
    // Return the body of the error
    if (axios.isAxiosError(err)) return err.response;
    // Creates an empty error
    else return new axios.AxiosError().response;
  }
};

// Get a new access-token
export const RefreshTokenService = async (): boolean => {
  try {
    await axios.get(`${GLOBALS.API_HOST}/api/session/refresh`, {
      withCredentials: true,
    });

    return true;
  } catch (err) {
    return false;
  }
};

// Recover the session user data from the api
// from the access token sended as a cookie
// withCredentials field is required
export const WhoamiService = async (it: number) => {
  if (it > 2) return new axios.AxiosError().response;

  try {
    const response = await axios.get(`${GLOBALS.API_HOST}/api/session/whoami`, {
      withCredentials: true,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Error caused because of no access-token provided
      if (err.response.status === 403) {
        await RefreshTokenService();
        return await WhoamiService(2); // Try one more time
      }

      return err.response;
    }
    return new axios.AxiosError().response;
  }
};

// Get user cart from api
export const GetCartService = async (it: number) => {
  if (it > 2) return new axios.AxiosError().response;

  try {
    const response = await axios.get(`${GLOBALS.API_HOST}/api/cart`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Error caused because of no access-token provided
      if (err.response.status === 403) {
        await RefreshTokenService();
        return await GetCartService(2); // Try one more time
      }

      return err.response;
    }
    return new axios.AxiosError().response;
  }
};
