import { React } from 'react';
import {  Button } from 'antd';
import { FaLock } from 'react-icons/fa6';
import Cookies from 'js-cookie';
import { properties } from './properties';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();
    
    const performLogout = () => {
        // localStorage.removeItem('isAuthenticated');
        Cookies.remove(`${properties.jwtidentifier}`)
        navigate('/admincontrol')
    } 


    return (
        <>
            <Button  onClick={performLogout}>
                <FaLock/><span>Logout</span>
            </Button>
            
        </>
    )

}

export default LogOut;