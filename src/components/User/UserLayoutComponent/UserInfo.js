import React, { useEffect, useState } from 'react';
import AccountService from '../../../services/accountService';
import { Input, Form, message, Spin, Alert, Button, Upload, Modal } from 'antd';
import AddressUser from './AddressUser';
//import UpdateUserModal from './UpdateUserModal';
import { UploadOutlined } from '@ant-design/icons';

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  // const isGoogleUser = userInfo && userInfo[0]??.password === "IsGoogle";
  const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
  const accountID = user?.accountID;
  const defaultAvatar = 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/175421/Originals/avatar-la-gi-2.jpg';
  const [form] = Form.useForm();

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

  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUpdate = async (values) => {
    const account = new FormData();
    account.append('fullName', values.fullName);
    account.append('phone', values.phone);
    account.append('password', values.password);
    if (values.password2) account.append('password2', values.password2);
    if (values.userName) account.append('userName', values.userName);
    if (values.email) account.append('email', values.email);
    if (fileList.length > 0) {
        account.append('imageUpload', fileList[0].originFileObj);
    }

    try {
      await AccountService.updateUser(userInfo[0].accountID, account);
      message.success('Cập nhật thông tin thành công');
      handleClose();
      loadAccount();
    } catch (error) {
      console.error(error);
      message.error('Cập nhật thông tin thất bại');
      setLoading(false);
    }
  };

  const loadAccount = async () => {
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

  useEffect(() => {
    const loadAccount = async () => {
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
        loadAccount();
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
        onFinish={handleSave}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Ảnh Đại Diện">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {userInfo[0]?.imageUrl && userInfo[0]?.imageUrl !== 'New Avatar' ? (
            <img
              src={`http://localhost:5031${userInfo[0]?.imageUrl}`}
              alt="Ảnh đại diện"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                marginBottom: '10px',
              }}
            />
            ):(
              <img
              src={defaultAvatar}
              
              alt="Ảnh đại diện"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                marginBottom: '10px',
              }}
            />
            )
          }  

          </div>
        </Form.Item>

          <Form.Item label="Họ và tên" name="name">
            <Input defaultValue={userInfo[0].fullName} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input defaultValue={userInfo[0].email} />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input defaultValue={userInfo[0].phone || "Chưa có"} />
          </Form.Item>

      </Form>

      {/* <UpdateUserModal userInfo={userInfo[0]} /> */}
      <Button type="primary" onClick={handleOpen}>
        Cập nhật thông tin
      </Button>

      <Modal
        visible={visible}
        title="Cập nhật thông tin người dùng"
        onCancel={handleClose}
        footer={null}
      >
        <Form
          form={form}
          initialValues={{
            fullName: userInfo[0].fullName,
            phone: userInfo[0].phone || '',
            password: '',
            email: userInfo[0].email,
            userName: userInfo[0].userName,
          }}
          onFinish={handleUpdate}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.Item label="Ảnh đại diện" name="imageUpload">
            <Upload
              beforeUpload={() => false}
              listType="picture"
              maxCount={1}
              fileList={fileList}
              onChange={handleChange}
              onRemove={() => setFileList([])}
            >
              <Button icon={<UploadOutlined />}>Tải lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone">
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' },
                        { min: 5, message: 'Mật khẩu phải từ 5 ký tự' },
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Mật khẩu" />
            </Form.Item>
            <Form.Item
                label="Nhập lại mật khẩu"
                name="password2"
                dependencies={['password']}
                rules={[
                { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || value === getFieldValue('password')) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu và mật khẩu xác nhận không khớp.'));
                    },
                }),
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Xác nhận mật khẩu" />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input value={userInfo[0].email} disabled />
            </Form.Item>
            <Form.Item label="Tên đăng nhập" name="userName">
                <Input value={userInfo[0].userName} disabled />
            </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
            <Button onClick={handleClose} style={{ marginLeft: 8 }}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    {/* Hiện thông tiin điiịa chiir */}
      <AddressUser/>

    </div>
  );
};

export default UserInfo;
