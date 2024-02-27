
import React from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Button, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { toggleCollapse } from './store';
import { useSelector } from 'react-redux';
import './AdminHeader.css'
const { Header } = Layout;

const AdminHeader = () => {

    const isCollapsed = useSelector((state) => state.collapsiblePanel.isCollapsed);
    
    //when collapse button is cliked update the redux store
    const dispatch = useDispatch();
    const handleToggle = () => {
        dispatch(toggleCollapse());
    }

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return (

        <>
            <Header className='sidebar_hdr'
            >
                <Button
                type="text"
                icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleToggle}
                className='sidebar_btn'
                />
            </Header>
        </>


    )

    
}

export default AdminHeader;