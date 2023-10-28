import { React,  useState } from 'react';
import {  Button, Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { FaLock } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();
    
    const performLogout = () => {
        localStorage.removeItem('isAuthenticated');
        navigate('/login')
    } 


    return (
        <>
            <Button  onClick={performLogout}>
                <FaLock/><span style={{marginLeft:5}}>Logout</span>
            </Button>
            
        </>
    )

}

export default LogOut;