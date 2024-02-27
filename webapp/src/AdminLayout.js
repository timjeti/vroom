import React from 'react';
import { Layout, Row, Col } from 'antd';
import SideBar from './SideBar';
import AdminHeader from './AdminHeader';

const AdminLayout = ({ children }) => {

  return (
    <>
    <Layout style={{marginTop:0}}>
      <SideBar/>
      
      <Row>
      <Layout>
        <AdminHeader/>
        {/* {container_component} */}
        {/* <AdminContainer/> */}
        {/* <AppRoutes />  */}
      </Layout>
      </Row>
      <Row>
      <Layout style={{marginTop:30}}>{children}</Layout>
      </Row>
    </Layout>

    </>
  );
};
export default AdminLayout;