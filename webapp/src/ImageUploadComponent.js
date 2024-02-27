import React, { useState, useEffect } from 'react';
import { Upload, Button, message, Tooltip, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { properties } from './properties';
import { uploadCar } from './CarApi';

function ImageUploadComponent({ carId }) {
   
    const [fileList, setFileList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const onChange = (info) => {
      handleChange(info)
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const handleChange = (info) => {
        let newFileList = [...info.fileList];
    
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-1);
    
        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });
        setFileList(newFileList);
      };
  
    const customRequest = async ({ file, onSuccess, onError }) => {
      uploadCar(carId, true, file, onSuccess, onError)
    };

    const handleOk = (val) => {
      setIsModalOpen(false);
  };
  
  const handleCancel = () => {
      setIsModalOpen(false);
  };
  
    return (
      <Modal title="Upload Car Image" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Upload
        fileList={fileList}
        customRequest={customRequest}
        onChange={onChange}
        maxCount={1} // You can limit the number of files to upload
        accept="image/*" // Accept only image files
      >
        <Tooltip title="Upload">
        <Button icon={<UploadOutlined />}>Upload</Button>
        </Tooltip>
      </Upload>
      </Modal>
    );
  }
  
  export default ImageUploadComponent;
  