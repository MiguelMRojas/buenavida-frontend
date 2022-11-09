import { useState, createContext, useEffect, ReactNode } from 'react';
import { getProducts, getProductImage } from '../services/products.service';
import { Iproduct } from '../interfaces/interfaces';
import { getProductsFiltrated } from '../services/products.service';

interface Props {
  children: ReactNode;
}

//add function filter, return axios response
interface IFilterContext {
  criteria: string;
  min: number;
  max: number;
  // eslint-disable-next-line no-unused-vars
  setCriteria: (criteria: string) => void;
  // eslint-disable-next-line no-unused-vars
  setMin: (min: number) => void;
  // eslint-disable-next-line no-unused-vars
  setMax: (max: number) => void;
  inventory: Array<Iproduct>;
  products: Array<Iproduct>;
  // eslint-disable-next-line no-unused-vars
  setProducts: (products: Array<Iproduct>) => void;
  // eslint-disable-next-line no-unused-vars
  filterProducts: () => void;
}

//default value return of function
// Create context with default values
export const FilterContext = createContext<IFilterContext>({
  criteria: '',
  min: 0,
  max: 81.8,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  setCriteria: (criteria: string) => {},
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  setMin: (min: number) => {},
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  setMax: (max: number) => {},
  inventory: [],
  products: [],
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  setProducts: (products: Array<Iproduct>) => {},
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-empty-function
  filterProducts: () => {},
});

// Component
export const FilterContextProvider = ({ children }: Props) => {
  const [inventory, setInventory] = useState(new Array<Iproduct>());
  const [products, setProducts] = useState(new Array<Iproduct>());

  const [criteria, setCriteria] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(81.8);

  useEffect(() => {
    const load = async () => {
      const response = await getProducts();
      const items: Array<Iproduct> = response.products;
      const products: Array<Iproduct> = [];

      for (let i = 0; i < items.length; i++) {
        const imageReply = await getProductImage(items[i].serial);
        //console.log(imageReply);
        products.push({ ...items[i], image: imageReply.image });
      }

      setInventory(products);
    };

    load();
  }, []);

  //updating products to show from filter
  const filterProducts = async () => {
    const response = await getProductsFiltrated(min, max, criteria);
    const items: Array<Iproduct> = response.products;
    const products: Array<Iproduct> = [];

    if (items != undefined) {
      for (let i = 0; i < items.length; i++) {
        const imageReply = await getProductImage(items[i].serial);
        products.push({ ...items[i], image: imageReply.image });
      }
      setInventory(products);
    }
  };

  return (
    <FilterContext.Provider
      value={{
        criteria,
        min,
        max,
        setCriteria,
        setMin,
        setMax,
        inventory,
        products,
        setProducts,
        filterProducts,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
