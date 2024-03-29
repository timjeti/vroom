import React from 'react'
import { Layout, Menu } from 'antd'
import { CarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'
const { Header } = Layout

const AppHeader = () => (

    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height:130}}>
    <div className="logo">
      {/* <Badge count={5}> */}
      {/* <CarFilled style={{ width: 25, height: 25,  color: 'white'  }} /> */}
      <Link to="/">
        <div style={{ width: 140, height: 120, backgroundImage: `url(${logo})`, backgroundSize: 'cover' ,color: 'white'}} />
      </Link>
      {/* </Badge> */}
      {/* <Link to="/entrypoint">
        <span style={{ marginLeft: '8px', fontSize: '18px', color: 'white' }}>SelfSavari</span>
      </Link> */}
    </div>
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} >
    <Menu.Item key="1" style={{  margin: '0.05%', display: 'none'}}>
        <Link to="/entrypoint">Cars</Link>
      </Menu.Item>
      <Menu.Item key="2" style={{  margin: '0.05%' }}>
        <Link to="/allcars">Cars</Link>
      </Menu.Item>
      {/* <Menu.Item key="2" style={{ margin: '0.05%' }}>
        <Link to ="/image">Image </Link>
      </Menu.Item> */}
      <Menu.Item key="3" style={{ margin: '0.05%' }}>
        <Link to="/contact">Contact</Link>
      </Menu.Item>
    </Menu>
    {/* <ShoppingCartOutlined style={{ fontSize: '24px', color: 'white' }} /> */}
  
  </Header>

  
);

export default AppHeader