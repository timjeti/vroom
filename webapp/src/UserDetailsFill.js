import React, {useState} from 'react';
import { Button, Upload, Form, Input, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userDetailsReducer } from './store';
import { updateUser } from './UsersApi';
import { uploadIdentity } from './UsersApi';

const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

const UserDetailsFill = ({setCurrent, initialVal, userPayload}) => 
{ 
    const dispatch = useDispatch()

    const [userDetailsVal, setUserDetailsVal] = useState(null)
    const onFinish = (values) => {
        console.log('Success:', values);
        setUserDetailsVal(values)
        dispatch(userDetailsReducer(values))
        const userId = userPayload.payload.id
        updateUser(userId, values)
        setCurrent(2)
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


  const customRequest = async ({ file, onSuccess, onError }) => {
      uploadIdentity(userPayload.payload.id, file, onSuccess, onError)
  };

    return (
    <Form
        name="basic"
        labelCol={{
        span: 8,
        }}
        wrapperCol={{
        span: 16,
        }}
        style={{
        maxWidth: 600,
        }}
        initialValues={initialVal === null? null : initialVal.payload}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
        label="name"
        name="name"
        rules={[
            {
            required: true,
            message: 'Please input your name!',
            },
        ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="email"
        name="email"
        rules={[
            {
            required: true,
            message: 'Please input your email!',
            },
        ]}
        >
        <Input />
        </Form.Item>

        <Form.Item
        label="age"
        name="age"
        rules={[
            {
            required: true,
            message: 'Please input your age!',
            },
        ]}
        >
        <Input />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload {...props} customRequest={customRequest}>
                <Button icon={<UploadOutlined />} >Upload png only</Button>
            </Upload>
        </Form.Item>


        <Form.Item
        wrapperCol={{
            offset: 8,
            span: 16,
        }}
        >
        <Button type="primary" htmlType="submit">
        Continue
        </Button>
        </Form.Item>
    </Form>
    )
};
export default UserDetailsFill;
