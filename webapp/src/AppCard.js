import { React } from 'react';
import { PhoneOutlined, WhatsAppOutlined,  } from '@ant-design/icons';
import { Card, Button, Col, Row, Space, Divider} from 'antd';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { FcEngineering } from "react-icons/fc";
import ImageComponent from './ImageComponent';
const { Meta } = Card;

const AppCard = ({car_id, car_name, car_price, car_price_min, car_cc}) => {

  const handleCallClick = () => {
    // Add your logic for the Call button click here
    // Phone number to call
    const phoneNumber = '6000451161';
    // Construct the phone call URL
    const phoneCallUrl = `tel:${phoneNumber}`;
    // Open the phone application to make the call
    window.open(phoneCallUrl);
    console.log('Call button clicked');
  };

  const handleChatClick = () => {
    // Add your logic for the Zoom button click here
    // console.log('Whats App button clicked');
    // Construct the WhatsApp message with the desired content
    const message = encodeURIComponent(`Hello, I am interested in booking ${car_name} car`);
    // Create the WhatsApp URL with the pre-filled message
    const whatsappUrl = `whatsapp://send?phone=916000451161&text=${message}&app_absent=0`;
    // Open WhatsApp in a new window or tab
    window.open(whatsappUrl, '_blank');
    console.log('WhatsApp button clicked');
  };
    // console.log(car_path)
    return (
    <Card style={{ width: 395, marginRight: "1%" }}
        cover={
        <ImageComponent carId={car_id}/>
        }

        // actions={[
        //   <FaIndianRupeeSign key="setting"></FaIndianRupeeSign>,
        //   <FcEngineering key="edit" />,
        // ]}
    >   
        <Space direction='vertical' size="small" style={{display:'flex'}}>
        <Row>
        <Col span={18}><Meta title={car_name}/></Col>
        {/* <Col  >
          <div>
              <FaIndianRupeeSign style={{ fontSize: '12', marginRight: '1' }}/><span style={{ fontWeight: 'bold' }}> {car_price}</span>
          </div>
        </Col> */}
        </Row>
        <div style={{ marginTop: '17', display: 'flex', justifyContent: 'space-between' }}>
        <Button  type="primary" icon={<WhatsAppOutlined key="chat"/>} onClick={handleChatClick}>
          Chat
        </Button>
        <Button  type="default" icon={<PhoneOutlined key="call"/>} onClick={handleCallClick}>
          Call
        </Button>
      </div>
      <Divider orientation="left" />
      <Row style={{ height: 12}}>
          <FcEngineering/>
          <div style={{ marginRight: 80 , marginTop: -4}} >
              <span style={{ marginLeft:5, fontWeight: 'bold', textAlign: 'right', fontSize: 14}}> {car_cc} cc</span>
          </div>
          <div style={{ height: 20}}>
          <Divider type="vertical" />
          </div>
          <FaIndianRupeeSign style={{color: 'forestgreen', marginLeft: 50}}/>
          <div style={{ fontSize: '12', marginLeft: 2, marginTop: -4}}>
          <span style={{ fontWeight: 'bold', fontSize: 14 }}> {car_price_min} - </span>
          </div>
          <FaIndianRupeeSign style={{color: 'forestgreen', marginLeft: 1}}/>
          <div style={{ fontSize: '12', marginLeft: 2, marginTop: -4}}>
          <span style={{ fontWeight: 'bold', fontSize: 14 }}>{car_price}</span>
          </div>
      </Row>

        </Space>
  </Card>
    );
}
export default AppCard;