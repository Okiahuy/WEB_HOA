// export default AdminLayout;
import React from 'react';
import { Layout} from 'antd';
import { Outlet } from 'react-router-dom'; // Outlet để render các trang con
import AdminHeader from '../components/Admin/LayoutAdminComponent/AdminHeader';
import Sidebar  from '../components/Admin/LayoutAdminComponent/Sidebar'

const {  Content } = Layout;


const AdminLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
       {/* Sidebar (Sider) */}
       <Sidebar />

        <Layout>
          {/* Header */}
          <AdminHeader />
      
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {/* Outlet để render nội dung trang con */}
            <Outlet />
          </Content>

      </Layout>
    </Layout>
  );
};

export default AdminLayout;

