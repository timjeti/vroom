import { Col, Divider, Row } from "antd"
import AllCars from "./AllCars"


const SearchCarResults = () => {
    return (
        <div>
            
            <Row style={{width: '70%'}}>

                <Col span={14} offset={2}>
                    <Divider>
                        <h3>We Have Filtered the Best Cars For Your Travel</h3>
                    </Divider>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <AllCars/>
                </Col>
            </Row>
        </div>
        
    )
}

export default SearchCarResults;