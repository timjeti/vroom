import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContact from './AppContact';
import AllCars from './AllCars';
import EntryPoint from './EntryPoint';
import LoginForm from './LoginForm';
import AdminPanel from './AdminPanel';

const AppRoutes = () => (
  <Routes>
    <Route path="/entrypoint" element={<EntryPoint/>} />
    <Route path="/allcars" element={<AllCars/>} />
    <Route path="/contact" element={<AppContact/>} />
    <Route path="/rowmanager" element={<AdminPanel/>} />
    <Route path="/login" element={<LoginForm/>}/>
  </Routes>
);

export default AppRoutes;