import { Carousel, Image } from 'antd';
import photo1 from './assets/photo1.jpg';
import photo2 from './assets/photo2.jpg';
import photo3 from './assets/photo3.jpg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { properties } from './properties';

const contentStyle = {
  height: '350px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const AppCarousel = () => {

  const [imageFiles, setImageFiles] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetch(`http://${properties.backendUrl}:${properties.backendPort}/slider`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((result) => {
        const newFileList = result.map((imageFile) => {
          const slider_url = imageFile.slider_url;
          return {
            url: slider_url
          };
        });
        setFileList(newFileList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [properties.backendUrl, properties.backendPort]);


return(
    <Carousel autoplay>
        {/* <div>
        <h3 style={contentStyle}>1</h3>
        </div>
        <div>
        <h3 style={contentStyle}>2</h3>
        </div>
        <div>
        <h3 style={contentStyle}>3</h3>
        </div>
        <div>
        <h3 style={contentStyle}>4</h3>
        </div> */}

      { Array.isArray(fileList)? (
                  (fileList.map((slider, index) => (
                    <div>
                      <Image src={slider.url} alt="Photo 1" />
                    </div> 
                  )))
                ) 
                :
                (
                  <p></p>
                )
            }
      
    </Carousel>
);

}

export default AppCarousel;