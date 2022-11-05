import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global styles
import './global.css';

// Contexts
import { FilterContextProvider } from './context/FilterContext';

// Components
import { Navbar } from './components/navbar/Navbar';
import { ProductsGrid } from './pages/productsGrid/ProductsGrid';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <FilterContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProductsGrid />}></Route>
        </Routes>
      </FilterContextProvider>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
