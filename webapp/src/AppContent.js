import React from 'react';
import AppRoutes from './AppRoutes';
import { Space , Layout } from 'antd';
import SideBar from './SideBar';
import Cookies from 'js-cookie';
import AdminHeader from './AdminHeader';
const { Content} = Layout;


const AppContent = () => {
  const isAuthenticated = Cookies.get('isAuthenticated') 

  return (
  <Layout>

    <Content>
      <div className="site-layout-content" style={{backgroundColor:"#FFFFFF"}}>
          <AppRoutes />
      </div>
    </Content>

  </Layout>

  );
  }

export default AppContent;