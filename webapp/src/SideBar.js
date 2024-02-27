import React from 'react';
import {
  UploadOutlined,
  UserOutlined,
  CarOutlined,
  CarTwoTone,
  EditTwoTone,
  EditOutlined,
  UserSwitchOutlined,
  DingdingOutlined,
  BlockOutlined,
} from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const SideBar = () => {

    //get the collapse button state from redux store
    const isCollapsed = useSelector((state) => state.collapsiblePanel.isCollapsed);

    return (
        <>  
            <Sider trigger={null} collapsible collapsed={isCollapsed} collapsedWidth={50}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="1" icon={<BlockOutlined/>}>
                    <Link to="/carmanager">Car Info</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<CarOutlined/>}>
                    <Link to="/carstable">Car Table</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<UserSwitchOutlined/>}>
                    <Link to="/avlblmanager">User Details</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<DingdingOutlined/>}>
                    <Link to="/usertrips">User Trips</Link>
                </Menu.Item>
                </Menu>

        </Sider>
        
        </>


    )






}

export default SideBar;