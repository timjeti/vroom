import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { uploadIdentity } from './UsersApi';
import { Button, message, Upload, Form } from 'antd';
import { Modal } from 'antd';

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

const UploadModal = ({phone}) => {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const customRequest = async ({ file, onSuccess, onError }) => {
      uploadIdentity(phone, file, onSuccess, onError)

  };
  const handleOk = (val) => {
      setIsModalOpen(false);
  };
  
  const handleCancel = () => {
      setIsModalOpen(false);
  };
    
    

    return(
      <Modal title="Upload UserID Proof" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload {...props} customRequest={customRequest}>
                <Button icon={<UploadOutlined/>} >Identity Proof</Button>
            </Upload>
        </Form.Item>
        </Modal>
    )

}

export default UploadModal