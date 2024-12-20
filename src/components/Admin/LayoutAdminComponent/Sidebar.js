import React from 'react';
import { Layout, Menu} from 'antd';
import { Link} from 'react-router-dom';
import {
  DashboardOutlined,
  SettingOutlined,
  OrderedListOutlined,
  //EnvironmentTwoTone,
  ProductOutlined,
  ProfileOutlined,
  CalculatorTwoTone,
} from '@ant-design/icons';

import myImage from '../../../assets/image.png'; // Đường dẫn đến ảnh

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider collapsible style={{ width: '500px', color: 'white'}}>
            <div className="logo" style={{ color: 'white', padding: '16px', textAlign: 'center' }}>
                <img
                src={myImage} // Sử dụng đường dẫn ảnh đã nhập
                alt="Mô tả ảnh" // Mô tả cho ảnh
                style={{ width: '150px', height: '150px', borderRadius: '100%' }} // Tùy chỉnh CSS nếu cần
            />
            </div>
            <Menu
            
                theme="dark"
                mode="inline"
                items={[
                {
                key: '1',
                icon: <DashboardOutlined />,
                label: <Link to="/admin/dashboard">TRANG CHỦ</Link>,
                },
                {
                key: '2',
                icon: <SettingOutlined />,
                label: <Link to="/admin/type">LOẠI HOA</Link>,
                },
                {
                  key: '3',
                  icon: <ProductOutlined />,
                  label: 'SẢN PHẨM',
                  children: [
                    {
                      key: '3-1',
                      label: <Link to="/admin/productlist-hoa">SẢN PHẨM HOA</Link>,
                    },
                    {
                      key: '3-2',
                      label: <Link to="/admin/productlist-dungcu">DỤNG CỤ</Link>,
                    },
                    {
                      key: '3-3',
                      label: <Link to="/admin/category">Danh mục sản phẩm</Link>,
                    },
                    {
                      key: '3-4',
                      label: <Link to="/admin/healthcheck-product">HeathCheck sản phẩm</Link>,
                    },
                  ],
                },
                {
                key: '4',
                icon: <OrderedListOutlined />,
                label: <Link to="/admin/supplier">NHÀ CUNG CẤP</Link>,
                },
                {
                  key: '5',
                  icon: <CalculatorTwoTone />,
                  label: 'ĐƠN HÀNG',
                  children: [
                    {
                      key: '5-1',
                      label: <Link to="/admin/order">ĐƠN HÀNG</Link>,
                    },
                    {
                      key: '5-2',
                      label: <Link to="/admin/invoice">HÓA ĐƠN</Link>,
                    },
                  ],
                },
                {
                key: '6',
                icon: <ProfileOutlined/>,
                label: <Link to="/admin/customer">KHÁCH HÀNG</Link>,
                },
                ]}
                />

        </Sider>

  );
};

export default Sidebar;
