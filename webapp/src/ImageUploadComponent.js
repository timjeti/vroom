import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function ImageUploadComponent() {
   
    const [fileList, setFileList] = useState([]);
  
    const onChange = (info) => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };
  
    const customRequest = async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const response = await fetch('http://localhost:4000/cars/upload/105', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          onSuccess();
        } else {
          onError();
        }
      } catch (error) {
        onError();
      }
    };
  
    return (
      <Upload
        fileList={fileList}
        customRequest={customRequest}
        onChange={onChange}
        maxCount={1} // You can limit the number of files to upload
        accept="image/*" // Accept only image files
      >
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
    );
  }
  
  export default ImageUploadComponent;
  