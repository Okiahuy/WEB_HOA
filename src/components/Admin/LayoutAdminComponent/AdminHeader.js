import React from 'react';
import { Layout, Button} from 'antd';
import {StopTwoTone} from '@ant-design/icons';

import iamdin from '../../../assets/admin.png'; // Đường dẫn đến ảnh

const { Header} = Layout;

const logout = () => {
  // Xóa thông tin người dùng khỏi localStorage
  localStorage.removeItem('user');
  console.log('Đăng xuất thành công.');
  // Có thể thêm logic điều hướng về trang đăng nhập hoặc trang chính
  window.location.href = '/login'; // Thay đổi đường dẫn tùy ý 
};
const login = () => {
  window.location.href = '/login';
};
const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

if (user) {
    const FullName = user.fullName; // Lấy Token
    console.log('User:', FullName); // In ra Token để kiểm tra
} else {
    // handle();
    console.log('Không có người dùng đăng nhập.');
}



const AdminHeader = () => {
  return (
    <Header style={{ background: '#fff', height: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
    <h1 style={{ margin: 0 }}>SHOP HOA</h1>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <img
          src={iamdin} // Sử dụng đường dẫn ảnh đã nhập
          alt="Mô tả ảnh" // Mô tả cho ảnh
          style={{ width: '50px', height: '50px', borderRadius: '100%' }} // Tùy chỉnh CSS nếu cần
      /> - 
      {user!=null? (
        <>
         <span style={{ marginRight: 20 }}>Xin chào, {user.fullName}!</span>
         <Button 
                style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }}
                onClick={logout} ><StopTwoTone />Đăng xuất</Button>
        </>
      ) : (
        <Button type="primary" onClick={login}>Đăng nhập</Button>
      )}       
    </div>
  </Header>
  );
};

export default AdminHeader;
