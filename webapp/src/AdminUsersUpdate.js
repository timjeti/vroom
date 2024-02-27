import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { footerCollapse } from './store';
import UserDetails from './UserDetails';
import { Card } from 'antd';

const AdminUsersUpdate = () => {

    const dispatch = useDispatch();
    const [maxCardSize, setMaxCardSize] = useState('default');
    const resize = () => {
      const maxSize = window.innerWidth;
      
      if(maxSize < 570){
        setMaxCardSize('small');
        console.log(maxCardSize)
      }else{
        setMaxCardSize('default');
        console.log(maxCardSize)
      }
      // return maxCardSize
      
    };

    useEffect(() => {
        // Reset the collapse state to its default when the component is unmounted
        dispatch(footerCollapse(true));
        //Cleanup code below to reset footer state
        window.addEventListener("resize", resize);
        return () => {
          dispatch(footerCollapse(false)); // Assuming false is the default value
          window.removeEventListener("resize", resize);
        };
      }, [dispatch]);

    

    return (
      <>
        <Card size={maxCardSize}>
          <UserDetails/>
        </Card>
      </>
    )
}

export default AdminUsersUpdate;