import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppContact from './AppContact';
import AllCars from './AllCars';
import EntryPoint from './EntryPoint';
import LoginForm from './LoginForm';
import AdminUserUpdateHandler from './AdminUserUpdateHandler';
import CarManagerHandler from './CarManagerHandler';
import LoginSteps from './LoginSteps';
import UserTripsHandler from './UserTripsHandler';
import UserProfile from './UserProfile';
import CarsTableHandler from './CarsTableHandler';
import CarSearch from './CarSearch';
import SearchCarResults from './SearchCarResults';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<EntryPoint/>} />
    <Route path="/allcars" element={<AllCars/>} />
    <Route path="/contact" element={<AppContact/>} />
    <Route path="/carmanager" element={<CarManagerHandler/>} />
    <Route path="/usermanager" element={<UserProfile/>}/>
    <Route path="/avlblmanager" element={<AdminUserUpdateHandler/>}/>
    <Route path="/admincontrol" element={<LoginForm/>}/>
    {/* <Route path="/userlogin" element={<LoginSteps/>}/> */}
    <Route path="/usertrips" element={<UserTripsHandler/>}/>
    <Route path="/carstable" element={<CarsTableHandler/>}/>
    <Route path="/carsearch" element={<CarSearch/>}/>
    <Route path="/carresults" element={<SearchCarResults/>}/>
  </Routes>
);

export default AppRoutes;