import React, { useState } from 'react';
import { Form, Input, Button, message, Spin } from 'antd';
import AccountService from '../../../services/accountService';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
const [loading, setLoading] = useState(false);
const [form] = Form.useForm();
 const navigate = useNavigate();
const onFinish = async (values) => {
    try {
        setLoading(true);
        const response = await AccountService.RegisterForm(values);
        console.log(response);
        message.success("Đăng ký tài khoản thành công");  // Show success message
        navigate(`/login`);
    } catch (error) {
        setLoading(false);
        if (error.response) {
            message.error(error.response.data.message || 'Đăng ký thất bại');
        } else {
            message.error('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    }
};
if (loading) {
    return <Spin tip="Đang tải chi tiết đơn hàng..." />;
  }

return (
    <div style={{ maxWidth: 300, margin: '0 auto', padding: '50px' }}>
    <h2>Đăng ký tài khoản</h2>
            <Form
                form={form}
                name="register"
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
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập Họ & Tên!' }]}
                >
                    <Input placeholder="Họ & Tên" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Số điện thoại!' }]}
                >
                    <Input placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    hasFeedback
                >
                    <Input.Password placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item
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


                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
    </div>
);
};

export default RegisterForm;