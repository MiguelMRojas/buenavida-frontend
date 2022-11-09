import { AxiosResponse } from 'axios';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { IUser, ICartItem } from '../interfaces/interfaces';
import { IUpdateCartPayload } from '../interfaces/interfaces.services';
import { UserTemplate } from '../templates/user';

import { OrderService, UpdateCartItemAmount } from '../services/shop.services';
import { GetProductImageFromEndpointService } from '../services/products.service';
import {
  WhoamiService,
  LogoutService,
  GetCartService,
  RemoveFromCartService,
  AddToCartService,
  GetFavoritesService,
  RemoveFromFavoritesService,
  AddToFavoritesService,
} from '../services/session.services';

interface Props {
  children: ReactNode;
}

interface ISessionCTX {
  user: IUser;
  isLoggedIn: boolean;
  isSessionLoading: boolean;
  cart: Array<ICartItem>;
  favorites: Array<string>;
  // eslint-disable-next-line no-unused-vars
  login: (response: AxiosResponse) => Promise<void>;
  logout: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  removeFromCart: (id: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  addToCart: (item: ICartItem) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  updateCart: (payload: IUpdateCartPayload) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  removeFromFavorites: (id: string) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  addToFavorites: (id: string) => Promise<boolean>;
  makeOrder: () => Promise<boolean>;
}

// Here we define the default values for each
// field of the ISessionCTX interface
export const SessionContext = createContext<ISessionCTX>({
  user: UserTemplate,
  isLoggedIn: false,
  isSessionLoading: true,
  cart: [],
  favorites: [],
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  login: async function (payload: AxiosResponse) {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: async function () {},
  // eslint-disable-next-line no-unused-vars
  removeFromCart: async function (id: string) {
    return true;
  },
  // eslint-disable-next-line no-unused-vars
  addToCart: async function (item: ICartItem) {
    return true;
  },
  // eslint-disable-next-line no-unused-vars
  updateCart: async function (payload: IUpdateCartPayload) {
    return true;
  },
  // eslint-disable-next-line no-unused-vars,
  removeFromFavorites: async function (id: string) {
    return true;
  },
  // eslint-disable-next-line no-unused-vars,
  addToFavorites: async function (id: string) {
    return true;
  },
  makeOrder: async function () {
    return true;
  },
});

// Session provider
export const SessionContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState(UserTemplate);
  const [cart, setCart] = useState(Array<ICartItem>);
  const [favorites, setFavorites] = useState(Array<string>);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Try to get the user information on reload
  // or new start
  useEffect(() => {
    const recover = async () => {
      const reply = await WhoamiService(1); // First iteration
      if (!reply) return;

      if (reply.status === 200) {
        setUser(reply.data.user);
        setIsSessionLoading(false);
        setIsLoggedIn(true);
      }
    };

    recover();
  }, []);

  // Get user cart and favorites on load
  useEffect(() => {
    const getUserCart = async () => {
      const reply = await GetCartService(1); // First try
      if (!reply?.data) return;

      const items = reply.data.products;
      const products: Array<ICartItem> = [];

      for (let i = 0; i < items.length; i++) {
        const response = await GetProductImageFromEndpointService(items[i].image);
        products.push({ ...items[i], image: response.image });
      }

      setCart(products);
    };

    const getUserFavorites = async () => {
      const reply = await GetFavoritesService(1); // First try
      if (!reply?.data) return;
      setFavorites(reply.data.favorites);
    };

    if (isLoggedIn) {
      // Only get when the user have an active session
      getUserCart();
      getUserFavorites();
    }
  }, [isLoggedIn]);

  // Actual value for login function
  const login = async (response: AxiosResponse) => {
    setUser(response.data.user);
    setIsLoggedIn(true);
    setIsSessionLoading(false);
  };

  // Remove item from cart
  const removeFromCart = async (id: string) => {
    const wasDeleted = await RemoveFromCartService(1, id);

    if (wasDeleted) {
      const newCart = cart.filter((product) => product.id != id);
      setCart(newCart);
      return true;
    }

    return false;
  };

  // Update amount for some item on cart
  const updateCart = async (payload: IUpdateCartPayload) => {
    if (payload.amount === '') return false;

    const newCart = cart.map((product) => {
      if (product.id === payload.id) {
        return { ...product, quantity: parseInt(payload.amount) };
      } else {
        return product;
      }
    });

    // Update on database
    const wasUpdated = await UpdateCartItemAmount(1, payload);

    if (wasUpdated) {
      setCart(newCart);
      return true;
    }

    return false;
  };

  // Logout
  const logout = async () => {
    setIsSessionLoading(true);
    const wasSessionClosed = await LogoutService(1);

    if (wasSessionClosed) {
      setIsLoggedIn(false);
      setUser(UserTemplate);
      setCart([]);
      setFavorites([]);
    }

    setIsSessionLoading(false);
  };

  // Add item to cart
  const addToCart = async (item: ICartItem) => {
    const wasAdded = await AddToCartService(1, item.id);

    if (wasAdded) {
      const exists = cart.some((product) => product.id === item.id);

      if (exists) {
        const newCart = cart.map((product) => {
          if (product.id === item.id) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        });

        setCart(newCart);
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }

      return true;
    }

    return false;
  };

  // Remove item from favorites
  const removeFromFavorites = async (id: string) => {
    const wasDeleted = await RemoveFromFavoritesService(1, id);
    console.log(wasDeleted);

    if (wasDeleted) {
      const newFavorites = favorites.filter((fid) => fid !== id);
      setFavorites(newFavorites);
      return true;
    }

    return false;
  };

  // Add item to favorites
  const addToFavorites = async (id: string) => {
    const wasAdded = await AddToFavoritesService(1, id);

    if (wasAdded) {
      setFavorites([...favorites, id]);
      return true;
    }

    return false;
  };

  // Create order from cart
  const makeOrder = async () => {
    const wasCreated = await OrderService(1);

    if (wasCreated) {
      setCart([]); // Empty cart
      return true;
    }

    return false;
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn,
        isSessionLoading,
        cart,
        favorites,
        removeFromCart,
        addToCart,
        updateCart,
        removeFromFavorites,
        addToFavorites,
        makeOrder,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
