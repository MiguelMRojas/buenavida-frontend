import { createContext, ReactNode } from 'react';
import { IUser } from '../interfaces/interfaces';

interface Props {
  children: ReactNode;
}

// Global context
export const SessionContext = createContext<IUser>({
  id: 1,
  email: 'foo@bar.com',
  firstname: 'foo',
  lastname: 'bar',
});

// Session provider
export const SessionContextProvider = ({ children }: Props) => {
  const user: IUser = {
    id: 1,
    email: 'foo@bar.com',
    firstname: 'foo',
    lastname: 'bar',
  };

  return <SessionContext.Provider value={user}>{children}</SessionContext.Provider>;
};
