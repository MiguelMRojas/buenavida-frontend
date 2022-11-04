import axios from 'axios';
import { GLOBALS } from '../config/config';
import { ILoginPayload } from '../interfaces/interfaces.services';

export const LoginService = async (payload: ILoginPayload) => {
  const response = await axios.post(`${GLOBALS.API_HOST}/api/session/login`, payload);
  return response;
};
