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

// Recover the session user data from the api
// from the access token sended as a cookie
// withCredentials field is required
export const WhoamiService = async () => {
  try {
    const response = await axios.get(`${GLOBALS.API_HOST}/api/session/whoami`, {
      withCredentials: true,
    });

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) return err.response;
    else return new axios.AxiosError().response;
  }
};
