import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Divider, Space, Card } from 'antd';
import { getImageUrl, getUser } from './UsersApi';
import './UserInfoDrawer.css'
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const UserInfoDrawer = ({openCmd, userId}) => {
  const [open, setOpen] = useState(openCmd);

  // const [user, setUser] = useState(userId);
  const [record, setrecord] = useState({});

  useEffect(() => {
    console.log(userId)
    getUser(userId, setrecord)
  }, [])

  // const showDrawer = () => {
  //   setOpen(true);
  // };
  const onClose = () => {
    console.log(record.name)
    setOpen(false);
  };

  
  return (
    <>
      <Drawer
        title="View User Info"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Close</Button>
          </Space>
        }
      >
        
        <p className="site-description-item-profile-p">Personal</p>
        <Divider/>
        <Row gutter={16}>
          <Col span={12}>
            <DescriptionItem title="Full Name" content={record.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content={record.email} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={4}>
            <DescriptionItem title="Age" content={record.age} />
          </Col>
          <Col span={8}>
            <DescriptionItem title="Phone" content={record.id} />
          </Col>
          <Col span={8}>
            <DescriptionItem title="Phone" content={record.created} />
          </Col>
        </Row>
        <p className="site-description-item-profile-p">Images</p>
        <Divider/>
        <Row gutter={16}>
          <Col span={12}>
              <Card title="User Image" bordered={true} cover={<img alt="user profile image" 
              src={getImageUrl(record.profile_path)} style={{height: 250}}/>} hoverable
              ></Card>
          </Col>
          <Col span={12}>
              <Card title="User Document" bordered={true} cover={<img alt="user profile image" 
              src={getImageUrl(record.identity_path)} style={{height: 250}}/>} hoverable
              ></Card>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
export default UserInfoDrawer;