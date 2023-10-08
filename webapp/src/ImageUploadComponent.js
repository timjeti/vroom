import React, { useState, useEffect } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function ImageUploadComponent({ oldCarId, isFirst, passCarId }) {
   
    const [fileList, setFileList] = useState([]);
    const [carId, setCarId] = useState([new Date().getTime().toString()])

    useEffect(() => {
        if(!isFirst){
          passCarId(oldCarId);
          setCarId(oldCarId)
        }else{
          passCarId(carId);
        }
      }, [isFirst, oldCarId, carId, passCarId]);    
  
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
      try {
        const formData = new FormData();
        formData.append('image', file);
        console.log(`http://localhost:4000/cars/upload/${carId}?isFirst=${isFirst}`)
        const response = await fetch(`http://localhost:4000/cars/upload/${carId}?isFirst=${isFirst}`, {
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
  