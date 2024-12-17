import React from 'react';
import { Layout, Col, Row} from 'antd';
import { Outlet } from 'react-router-dom';
import FlowerShopFooter from '../components/User/UserLayoutComponent/FlowerShopFooter';
import FlowerShopHeader from '../components/User/UserLayoutComponent/FlowerShopHeader';
import HeaderMain from '../components/User/UserLayoutComponent/HeaderMain';


const {Content } = Layout;

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
    
      <FlowerShopHeader/>
      <HeaderMain/>
      {/* Content area */}
      <Row justify="center" gutter={16}>
          <Col xs={12} sm={12} md={16}>
            <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
                <Outlet />
            </Content>
        </Col>
      </Row>
       
        <FlowerShopFooter/>

    </Layout>
  );
};

export default UserLayout;
