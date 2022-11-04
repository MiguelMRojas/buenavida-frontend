import { useState, createContext, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

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
}

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
});

// Component
export const FilterContextProvider = ({ children }: Props) => {
  const [criteria, setCriteria] = useState('');
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(81.7);

  return (
    <FilterContext.Provider value={{ criteria, min, max, setCriteria, setMin, setMax }}>
      {children}
    </FilterContext.Provider>
  );
};
