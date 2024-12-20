import React, { useState } from 'react'; ///npm install react-google-login ,npm install @react-oauth/google 
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:5031/api/auth'; 

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
        const response = await axios.post(`${API_URL}/login`, {
            UserName: values.username,
            Password: values.password,
        });
        const {accountID, fullName, roleID, email, token,totalItems } = response.data;

        // Lưu thông tin người dùng vào LocalStorage
        localStorage.setItem('user', JSON.stringify({
            accountID,
            fullName,
            roleID,
            email,
            token,
            totalItems
        }));
        message.success('Đăng nhập thành công!');
        // Kiểm tra RoleID và điều hướng người dùng
        if (roleID === 1) {
            // Điều hướng đến trang admin nếu RoleID là 1
            window.location.href = '/admin'; //  đường dẫn đến trang admin 
        } else if (roleID === 2) {
            // Điều hướng đến trang user nếu RoleID là 2
            window.location.href = '/user'; // đường dẫn đến trang user
        } else {
            window.location.href = '/user'; 
            message.error('Đăng nhập thất bại!');
        }
    } catch (error) {
        message.error(error.response?.data || 'Đăng nhập thất bại!');
    } finally {
        setLoading(false); // Đặt loading về false trong cả trường hợp thành công và lỗi
    }
};

const handleRegisterClick = () => {
 navigate(`/register`);
};
const handleGoogleLogin = (response) => {
  if (response) {
    const { credential } = response;
    console.log(credential);

    // Gửi token về backend
    fetch(`${API_URL}/google-response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credential }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || 'Lỗi không xác định');
          });
        }
        return res.json();
      })
      .then((data) => {
        // Kiểm tra dữ liệu phản hồi từ server
        const {accountID, fullName, roleID, email, token, totalItems } = data || {};

        if (!accountID || !fullName || !roleID|| !email || !token || totalItems === undefined) {
          console.log(JSON.stringify({accountID, fullName, roleID, email, token, totalItems }));
          throw new Error('Dữ liệu trả về từ server không hợp lệ');
        }

        // Lưu thông tin người dùng vào LocalStorage
        localStorage.setItem('user',JSON.stringify({accountID, fullName, roleID, email, token, totalItems })
        );

        message.success('Đăng nhập thành công!');

        // Điều hướng dựa trên roleID
        if (roleID === 2) {
          window.location.href = '/user'; // Điều hướng đến trang người dùng
        } else {
          message.error('Bạn không có quyền truy cập!');
        }
      })
      .catch((err) => {
        console.error('Lỗi khi gửi token:', err.message);
        message.error(err.message || 'Đăng nhập thất bại!');
      });
  } else {
    console.error('Google login failed');
    message.error('Đăng nhập Google thất bại.');
  }
};
  return (
    <div style={{ maxWidth: 350, margin: '0 auto', padding: '50px', alignItems: 'center' }}>
      
          <h2>Đăng nhập</h2>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
              <Input placeholder="Tên đăng nhập" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" loading={loading}>
                Đăng nhập
              </Button>
            </Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h4 style={{ marginBottom: "10px", marginRight: "1px" }}>
                  Bạn chưa có tài khoản?
                </h4>
                <Button type="link" onClick={handleRegisterClick}>
                  Đăng ký
                </Button>
              </div>
            <Form.Item>
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.log("Login Failed")}
                  theme="outline"
                  shape="rectangular"
                  size="large"
                  style={{ width: '100%' }}
                />
            
            </Form.Item>
          </Form>
          
        
    </div>
  );
};

                                            

export default LoginForm;
