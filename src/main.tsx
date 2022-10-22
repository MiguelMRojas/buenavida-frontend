import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Global styles
import './global.css';

// Components
import { Navbar } from './components/navbar/Navbar';
import { Starter } from './pages/Starter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Starter />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
