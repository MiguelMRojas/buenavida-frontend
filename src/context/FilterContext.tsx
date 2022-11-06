import { useState, createContext, useEffect, ReactNode } from 'react';
import { getProducts, getProductImage } from '../services/products.service';
import { Iproduct } from '../interfaces/interfaces';

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
}

//default value return of function
// Create context with default values
export const FilterContext = createContext<IFilterContext>({
  criteria: '',
  min: 0,
  max: 81.7,
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
});

// Component
export const FilterContextProvider = ({ children }: Props) => {
  const [inventory, setInventory] = useState(new Array<Iproduct>());
  const [products, setProducts] = useState(new Array<Iproduct>());

  const [criteria, setCriteria] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(81.7);


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

  const updateFilter = () => {
    console.log('test');
  };

  console.log(updateFilter());

  //real function
  return (
    <FilterContext.Provider value={{ criteria, min, max, setCriteria, setMin, setMax, inventory, products, setProducts, /* updateFilter */ }}>
      {children}
    </FilterContext.Provider>
  );
};
