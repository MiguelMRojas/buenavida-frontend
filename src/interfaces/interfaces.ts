export interface Iproduct {
  id: string;
  serial: number;
  name: string;
  image: string;
  units: string;
  annotations: string;
  discount: number;
  price: number;
  description: string;
}

export interface ICartItem {
  id: string;
  name: string;
  units: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ModalProduct {
  id: string;
  name: string;
  image: string;
  units: string;
  annotations: string;
  discount: number;
  price: number;
  description: string;
}

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

// Session provider interface
export interface ISessionProvider {
  user: IUser;
}
