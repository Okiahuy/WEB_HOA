import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const TypeForm = ({ visible, onOk, onCancel, initialValues }) => {
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
            title={initialValues ? 'Sửa loại' : 'Thêm loại'}
            open={visible}
            onCancel={onCancel}
            footer={null} // Xóa các nút mặc định của Modal
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label="Tên loại"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên loại' },
                        { min: 3, message: 'Tên loại ít nhất 3 ký tự' },
                    ]}
                >
                    <Input autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả' },
                        { min: 5, message: 'Mô tả loại ít nhất 5 ký tự' },
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
export default TypeForm;
