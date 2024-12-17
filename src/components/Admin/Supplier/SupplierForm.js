// src/components/SupplierModal.js
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const SupplierForm = ({ visible, onOk, onCancel, initialValues }) => {
    const [form] = Form.useForm();

    // Reset form khi mở modal
    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (initialValues) {
                form.setFieldsValue(initialValues);
            }
        }
    }, [visible, initialValues, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onOk(values); // Gọi hàm onOk khi các trường hợp đều hợp lệ
        } catch (error) {
            console.log('Validation failed:', error);
        }
    };

    return (
        <Modal
            title={initialValues ? 'Sửa Nhà Cung Cấp' : 'Thêm Nhà Cung Cấp'}
            visible={visible}
            onCancel={onCancel}
            footer={null} // Xóa các nút mặc định của Modal
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label="Tên nhà cung cấp"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên nhà cung cấp' },
                        { min: 3, message: 'Tên nhà cung cấp ít nhất 3 ký tự' },
                    ]}
                >
                    <Input autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Địa chỉ"
                    rules={[
                        { required: true, message: 'Vui lòng nhập Địa chỉ' },
                        { min: 5, message: 'Địa chỉ nhà cung cấp ít nhất 5 ký tự' },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item>
                    <Button 
                        style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }}
                    
                        htmlType="submit">
                        {initialValues ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SupplierForm;
