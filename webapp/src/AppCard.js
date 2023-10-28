import { React } from 'react';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Card, Button, Col, Row } from 'antd';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import ImageComponent from './ImageComponent';
const { Meta } = Card;

const AppCard = ({car_id, car_name, car_price}) => {

  const handleCallClick = () => {
    // Add your logic for the Call button click here
    // Phone number to call
    const phoneNumber = '8876501740';
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
    const message = encodeURIComponent("I am interested in booking Hyundai Creta car");

    // Create the WhatsApp URL with the pre-filled message
    const whatsappUrl = `whatsapp://send?phone=918876501740&text=${message}&app_absent=0`;

    // Open WhatsApp in a new window or tab
    window.open(whatsappUrl, '_blank');

    console.log('WhatsApp button clicked');
  };
    // console.log(car_path)
    return (
    <Card style={{ width: 300 }}
        cover={
        // <img
        //     alt={car_path}
        //     src={require( ""+car_path )}
        // />
        <ImageComponent carId={car_id}/>
        }
    >
        <Row>
        
        <Col span={18}><Meta title={car_name}/></Col>
        <Col >
          <div>
              <FaIndianRupeeSign style={{ fontSize: '12', marginRight: '1' }}/><span style={{ fontWeight: 'bold' }}> {car_price}</span>
          </div>
        </Col>
        </Row>

        
        
        <div style={{ marginTop: '16', display: 'flex', justifyContent: 'space-between' }}>
        <Button  type="primary" icon={<WhatsAppOutlined key="chat"/>} onClick={handleChatClick}>
          Chat
        </Button>
        <Button  type="default" icon={<PhoneOutlined key="call"/>} onClick={handleCallClick}>
          Call
        </Button>
      </div>
  </Card>
    );
}

export default AppCard;