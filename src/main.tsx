import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Global styles
import './global.css';

// Contexts
import { SessionContextProvider } from './context/SessionContext';

// Components
import { Navbar } from './components/navbar/Navbar';
import { ProductsGrid } from './pages/productsGrid/ProductsGrid';
import { Login } from './pages/login/Login';
import { Signup } from './pages/signup/Signup';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <SessionContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProductsGrid />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
