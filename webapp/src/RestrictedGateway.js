import { React,  useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import Restricted from './Restricted';
import Cookies from 'js-cookie';
import AdminLayout from './AdminLayout';

const RestrictedGateway = () => {

    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAuthenticated = Cookies.get('isAuthenticated') 

    return (
        <>
            { isAuthenticated ? <AdminLayout/> : <Restricted/> }
        
        </>
    )

}

export default RestrictedGateway;