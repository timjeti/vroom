import React, { useEffect, useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { deleteSlider } from './SliderApi';
import { properties } from './properties';
import { getImageUrl } from './UsersApi';

// Import all image files from the "assets" folder
// const imagesContext = require.context('./assets', false, /\.(png|jpe?g|gif|svg)$/);

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const ImgUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    fetch(`${properties.backendUrl}/slider`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((result) => {
        // setImageFiles(result);
        const newFileList = result.map((imageFile) => {
          const name = `${imageFile.slider_id}`;
          //not using slider_url since it is fixed to localhost
          const slider_url = getImageUrl(imageFile.slider_path);
          return {
            uid: name,
            name,
            status: 'done',
            url: slider_url,
          };
        });
        setFileList(newFileList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

    // Create a file list with image URLs



  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);

  const handleChange = ({ file, event, fileList: newFileList }) => {
    console.log('CHANGE:Delete clicked')
    if(file.status === 'removed' ){
      deleteSlider(file.uid)
      setFileList(newFileList);
    }
    
  }

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      // console.log(`${properties.backendUrl}/cars/upload/${carId}?isFirst=${isFirst}`)
      const response = await fetch(`${properties.backendUrl}/slider/`, {
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
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  

  return (
    <div style={{marginLeft:20}}>
      <Upload
        customRequest={customRequest}
        fileList={fileList}
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
        
      </Upload>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default ImgUpload;
