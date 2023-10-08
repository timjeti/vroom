import React from 'react';
import { Carousel, Image } from 'antd';
import photo1 from './assets/photo1.jpg';
import photo2 from './assets/photo2.jpg';
import photo3 from './assets/photo3.jpg';
const contentStyle = {
  height: '350px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const AppCarousel = () => {
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
        <div>
        <Image src={photo1} alt="Photo 1" />
      </div>
      <div>
        <Image src={photo2} alt="Photo 2" />
      </div>
      <div>
        <Image src={photo3} alt="Photo 3" />
      </div>
    </Carousel>
);

}

export default AppCarousel;