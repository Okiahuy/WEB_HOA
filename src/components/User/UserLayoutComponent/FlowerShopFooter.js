import React from 'react';
import { Layout, Typography, Row, Col, Space, Divider } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text } = Typography;

const FlowerShopFooter = () => {
    return (
        <Footer style={{ backgroundColor: '#f0f2f5'}}>
            <Divider />
            <Row justify="center" gutter={16}>
                <Col xs={24} sm={12} md={4}>
                    <Text strong>Thông Tin Cửa Hàng</Text>
                    <div>
                        <Text>Shop Hoa - DTHU</Text><br />
                        <Text>Địa chỉ: 123 Đường Hoa, Quận 1, TP.HCM</Text><br />
                        <Text>Điện thoại: (012) 345 6789</Text><br />
                        <Text>Email: cucungflowers@example.com</Text>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={4}>
                    <Text strong>Dịch Vụ</Text>
                    <div>
                        <Text><a href="/about">Giới Thiệu</a></Text><br />
                        <Text><a href="/products">Sản Phẩm</a></Text><br />
                        <Text><a href="/contact">Liên Hệ</a></Text>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={4}>
                    <Text strong>Danh Mục Sản Phẩm</Text>
                    <div>
                        <Text><a href="/categories/hoa-tang">Hoa Tặng</a></Text><br />
                        <Text><a href="/categories/hoa-cay">Hoa Cây</a></Text><br />
                        <Text><a href="/categories/hoa-noel">Hoa Noel</a></Text><br />
                        <Text><a href="/categories/hoa-sinh-nhat">Hoa Sinh Nhật</a></Text>
                    </div>
                </Col>
                <Col xs={24} sm={12} md={4}>
                    <Text strong>Liên Kết Mạng Xã Hội</Text>
                    <Space size="middle">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined style={{ fontSize: '24px', color: '#3b5998' }} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <InstagramOutlined style={{ fontSize: '24px', color: '#E1306C' }} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <TwitterOutlined style={{ fontSize: '24px', color: '#1DA1F2' }} />
                        </a>
                    </Space>
                </Col>
            </Row>
            <Divider />
            <Text style={{ textAlign: 'center', display: 'block' }}>
                &copy; {new Date().getFullYear()} Shop Hoa Tươi Cục Cưng. Bản quyền thuộc về bạn.
            </Text>
        </Footer>
    );
};

export default FlowerShopFooter;
