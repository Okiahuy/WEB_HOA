import React, { useEffect, useState } from 'react';
import AccountService from '../../../services/accountService';
import { Input, Form, message, Spin, Alert, Button } from 'antd';
import AddressUser from './AddressUser';

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState([]);

  const isGoogleUser = userInfo && userInfo[0]?.password === "IsGoogle";
  const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
  const accountID = user?.accountID;
  if (user) {
      const FullName = user.fullName; // Lấy Token
      console.log('User:', FullName); // In ra Token để kiểm tra
  } else {
      console.log('');
  }
  const handleSave = (values) => {
    setUserInfo(values);
    message.success('Thông tin đã được cập nhật thành công!');
  };
  useEffect(() => {
    const loadOrderDetail = async () => {
        setLoading(true);
        try {
          const response = await AccountService.getAccountByAccountID(accountID)
          setUserInfo(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      if (accountID) {
        loadOrderDetail();
      }
  }, [accountID]);


  if (loading) {
    return <Spin tip="Đang tải chi tiết đơn hàng..." />;
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }
  return (
    <div>
      <h2>Thông Tin Người Dùng</h2>
      <Form
        initialValues={userInfo[0]}
        onFinish={handleSave}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Họ và tên" name="name">
            <Input defaultValue={userInfo[0].fullName} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input defaultValue={userInfo[0].email} />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input defaultValue={userInfo[0].phone || "Chưa có"} />
          </Form.Item>
          {/* Conditionally show the password field and update button */}
          {!isGoogleUser && (
            <>
              <Form.Item label="Mật khẩu mới" name="newPassword">
                <Input.Password />
              </Form.Item>

              <Form.Item label="Số điện thoại mới" name="newPhone">
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Cập nhật thông tin
                </Button>
              </Form.Item>
              </>
          )}
      </Form>
    {/* Hiện thông tiin điiịa chiir */}
      <AddressUser/>

    </div>
  );
};

export default UserInfo;
