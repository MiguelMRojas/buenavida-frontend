import axios from 'axios';
import { GLOBALS } from '../config/config';
import { ISignupPayload } from '../interfaces/interfaces.services';

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
