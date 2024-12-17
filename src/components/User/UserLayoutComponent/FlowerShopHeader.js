import React from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const FlowerShopHeader = () => {
    return (
         
        <Header style={{ backgroundColor: '#ffcccb', color: 'white', height: '50px'}}>
            <Row justify="center" gutter={16}>
                <Col xs={12} sm={12} md={8}>
                    <Text style={{ fontSize: '20px', fontWeight: 'bold' }}>Shop Hoa - DTHU</Text>
                </Col>
                <Col xs={12} sm={12} md={8}>
                    <Text style={{ marginRight: '20px' }}>
                        <PhoneOutlined style={{ marginRight: '5px' }} />
                        (012) 345 6789
                    </Text>
                    <Text>
                        <MailOutlined style={{ marginRight: '5px' }} />
                        ShopHoaDTHU@example.com
                    </Text>
                </Col>
            </Row>
        </Header>
    );
};

export default FlowerShopHeader;
