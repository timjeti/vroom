import React from 'react'
import { Layout, Row, Col, Link } from 'antd'
import { useSelector } from 'react-redux';

const {Footer} = Layout;
const AppFooter = () => {

    const isFooterCollapsed = useSelector((state) => state.collapsibleFooter.isCollapsed);
    //check if footer is disabled in child component
    console.log(isFooterCollapsed.payload)
    return <>
         {!isFooterCollapsed.payload ? (<Footer>
            <Row>
                <Col span={12}>
                    <p>SelfSavari.com</p>
                </Col>
                    
                <Col span={10} offset={2}>
                    <p>Guwahati|Assam</p>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <p>Most Trusted Car Rental</p>
                </Col>
                    
                <Col span={10} offset={2}>
                    <p>Cheapest Car Rentals</p>
                </Col>
            </Row>
        
        
        </Footer>):
        console.log("collapsed")
        }
    </>


}

export default AppFooter