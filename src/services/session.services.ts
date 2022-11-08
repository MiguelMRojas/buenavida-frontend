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
export const RefreshTokenService = async (): Promise<boolean> => {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WhoamiService = async (it: number): Promise<any> => {
  if (it > 2) return new axios.AxiosError().response;

  try {
    const response = await axios.get(`${GLOBALS.API_HOST}/api/session/whoami`, {
      withCredentials: true,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Error caused because of no access-token provided
      if (err.response?.status === 403) {
        await RefreshTokenService();
        return await WhoamiService(it++); // Try one more time
      }

      return err.response;
    }
    return new axios.AxiosError().response;
  }
};

// Get user cart from api

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GetCartService = async (it: number): Promise<any> => {
  if (it > 2) return new axios.AxiosError().response;

  try {
    const response = await axios.get(`${GLOBALS.API_HOST}/api/cart`, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Error caused because of no access-token provided
      if (err.response?.status === 403) {
        await RefreshTokenService();
        return await GetCartService(it++); // Try one more time
      }

      return err.response;
    }
    return new axios.AxiosError().response;
  }
};

// Add to user cart
export const AddToCartService = async (it: number, id: string): Promise<boolean> => {
  if (it > 2) return false;

  try {
    const payload = { id };
    const response = await axios.post(`${GLOBALS.API_HOST}/api/cart`, payload, {
      withCredentials: true,
    });

    return response.status === 200 ? true : false;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 403) {
        await RefreshTokenService();
        return await AddToCartService(it++, id);
      }
      return false;
    }
    return false;
  }
};

// Remove item from user cart
export const RemoveFromCartService = async (it: number, id: string): Promise<boolean> => {
  if (it > 2) return false;

  try {
    const response = await axios.delete(`${GLOBALS.API_HOST}/api/cart/${id}`, {
      withCredentials: true,
    });

    return response.status === 200 ? true : false;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Error caused because of no access-token provided
      if (err.response?.status === 403) {
        await RefreshTokenService();
        return await GetCartService(it++); // Try one more time
      }
      return false;
    }

    return false;
  }
};
