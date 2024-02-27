import React, { useState } from 'react';
import { Avatar, List, Radio, Space } from 'antd';
import CarInitDb from './CarInitDb';

const UserHistoryList = ({trips}) => {
    const [position, setPosition] = useState('bottom');
    const [align, setAlign] = useState('center');
    console.log(trips)
    return (
        <>
          <Space
            direction="vertical"
            style={{
              marginBottom: '20px',
            }}
            size="middle"
          >
            <Space>
              <Radio.Group
                optionType="button"
                value={'center'}
              >
              </Radio.Group>
            </Space>
          </Space>
          <List
            pagination={{
              position,
              align,
            }}
            dataSource={trips}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                  }
                  title={<a href="https://ant.design">Trip on {item.start}</a>}
                  description={item.city}
                  extras={item.end}
                />
              </List.Item>
            )}
          />
        </>
      );
}

export default UserHistoryList;