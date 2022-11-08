import { AxiosResponse } from 'axios';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { IUser, ICartItem } from '../interfaces/interfaces';
import { UserTemplate } from '../templates/user';

import { GetProductImageFromEndpointService } from '../services/products.service';
import { WhoamiService, GetCartService } from '../services/session.services';

interface Props {
  children: ReactNode;
}

interface ISessionCTX {
  user: IUser;
  isLoggedIn: boolean;
  isSessionLoading: boolean;
  cart: Array<ICartItem>;
  // eslint-disable-next-line no-unused-vars
  login: (response: AxiosResponse) => Promise<void>;
}

// Here we define the default values for each
// field of the ISessionCTX interface
export const SessionContext = createContext<ISessionCTX>({
  user: UserTemplate,
  isLoggedIn: false,
  isSessionLoading: true,
  cart: [],
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  login: async function (payload: AxiosResponse) {},
});

// Session provider
export const SessionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(UserTemplate);
  const [cart, setCart] = useState(Array<ICartItem>);
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

  // Get user cart onload
  useEffect(() => {
    const getUserCart = async () => {
      const reply = await GetCartService();
      if (!reply?.data) return;

      const items = reply.data.products;
      const products: Array<ICartItem> = [];

      for (let i = 0; i < items.length; i++) {
        const response = await GetProductImageFromEndpointService(items[i].image);
        products.push({ ...items[i], image: response.image });
      }

      setCart(products);
    };

    getUserCart();
  }, [user]);

  // Actyual value for login function
  const login = async (response: AxiosResponse) => {
    setUser(response.data.user);
    setIsLoggedIn(true);
    setIsSessionLoading(false);
  };

  return (
    <SessionContext.Provider value={{ user, login, isLoggedIn, isSessionLoading, cart }}>
      {children}
    </SessionContext.Provider>
  );
};
