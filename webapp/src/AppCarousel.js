import { Carousel, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { properties } from './properties';
import { getImageUrl } from './UsersApi';


const AppCarousel = () => {

  // const [imageFiles, setImageFiles] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetch(`${properties.backendUrl}/slider`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((result) => {
        const newFileList = result.map((imageFile) => {
          console.log(imageFile)
          const slider_path = imageFile.slider_path;
          console.log(slider_path)
          return {
            path: slider_path
          };
        });
        setFileList(newFileList);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


return(
    <Carousel autoplay style={{width: '100%'}}>
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
                      <Image src={getImageUrl(slider.path)} alt="Photo 1" />
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