import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContact from './AppContact';
import AllCars from './AllCars';
import EntryPoint from './EntryPoint';
import CarManager from './CarManager';

const AppRoutes = () => (
  <Routes>
    <Route path="/entrypoint" element={<EntryPoint/>} />
    <Route path="/allcars" element={<AllCars/>} />
    <Route path="/contact" element={<AppContact/>} />
    <Route path="/rowmanager" element={<CarManager/>} />
  </Routes>
);

export default AppRoutes;