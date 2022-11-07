import { AxiosResponse } from 'axios';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '../interfaces/interfaces';
import { UserTemplate } from '../templates/user';
import { WhoamiService } from '../services/session.services';

interface Props {
  children: ReactNode;
}

interface ISessionCTX {
  user: IUser;
  isLoggedIn: boolean;
  isSessionLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  login: (response: AxiosResponse) => Promise<void>;
}

// Here we define the default values for each
// field of the ISessionCTX interface
export const SessionContext = createContext<ISessionCTX>({
  user: UserTemplate,
  isLoggedIn: false,
  isSessionLoading: true,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  login: async function (payload: AxiosResponse) {},
});

// Session provider
export const SessionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(UserTemplate);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Try to get the user information on reload
  // or new start
  useEffect(() => {
    const recover = async () => {
      const reply = await WhoamiService();
      if (!reply) return;

      if (reply.status === 200) {
        setUser(reply.data.user);
        setIsSessionLoading(false);
        setIsLoggedIn(true);
      }
    };

    recover();
  }, []);

  // Actyual value for login function
  const login = async (response: AxiosResponse) => {
    setUser(response.data.user);
    setIsLoggedIn(true);
    setIsSessionLoading(false);
  };

  return (
    <SessionContext.Provider value={{ user, login, isLoggedIn, isSessionLoading }}>
      {children}
    </SessionContext.Provider>
  );
};
