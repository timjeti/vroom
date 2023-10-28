import { React,  useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CarManager from './CarManager';
import Restricted from './Restricted';
import Cookies from 'js-cookie';

const AdminPanel = () => {

    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    return (
        <>
            { isAuthenticated ? <CarManager/> : <Restricted/> }
        
        </>
    )

}

export default AdminPanel;