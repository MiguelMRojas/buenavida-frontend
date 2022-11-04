import { AxiosResponse } from 'axios';
import { createContext, useState, ReactNode } from 'react';
import { IUser } from '../interfaces/interfaces';
import { ILoginPayload } from '../interfaces/interfaces.services';
import { UserTemplate } from '../templates/user';

interface Props {
  children: ReactNode;
}

interface ISessionCTX {
  user: IUser;
  // eslint-disable-next-line no-unused-vars
  login: (payload: ILoginPayload) => Promise<void>;
}

// Here we define the default values for each
// field of the ISessionCTX interface
export const SessionContext = createContext<ISessionCTX>({
  user: UserTemplate,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  login: async function (payload: ILoginPayload) {},
});

// Session provider
export const SessionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(UserTemplate);

  // Actyual value for login function
  const login = async (response: AxiosResponse) => {
    setUser(response.data.user);
  };

  return <SessionContext.Provider value={{ user, login }}>{children}</SessionContext.Provider>;
};
