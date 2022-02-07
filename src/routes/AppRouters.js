import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CajaMusical from '../components/CajaMusical';





export const AppRouters = () => {
  return(
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<CajaMusical  /> } />
        </Routes>
      </BrowserRouter>
  ) 
};
