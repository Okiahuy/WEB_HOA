// src/components/CategoryModal.js
import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const CategoryForm = ({ visible, onOk, onCancel, initialValues }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]); // State to manage file list
    // Reset form khi mở modal 
    useEffect(() => {
        if (visible) {
            form.resetFields();
            if (initialValues) {
                form.setFieldsValue(initialValues);
            }
        }
    }, [visible, initialValues, form]);

   useEffect(() => {
         // Populate form with initial values, including an image if available
         if (initialValues) {
             form.setFieldsValue(initialValues); // Set other initial form fields
             if (initialValues.image) {
                 setFileList([
                     {
                         uid: '-1', // Unique ID for the existing file
                         name: 'Existing Image', // Display name
                         url: initialValues.image, // URL of the existing image
                     },
                 ]);
             }
         }
     }, [initialValues, form]);
    
      const handleChange = ({ fileList }) => {
          setFileList(fileList); // Update state with the new file list
      };
      const handleSubmit = async () => {
        try {
            // Validate the form fields
            const values = await form.validateFields(); // No need to redeclare values here
    
            // Create a FormData object to send data
            const formData = new FormData();
            
            // Add values to FormData
            formData.append('name', values.name);
            formData.append('description', values.description);
            
            if (fileList.length > 0) {
              const file = fileList[0].originFileObj || fileList[0];
              formData.append('imageUpload', file);
          }
    
            // Call onOk after successful product addition
            onOk(formData); // Assuming onOk is a function to close the modal or do something else
    
        } catch (error) {
            console.log('Validation failed:', error); // Log validation errors
        }
    };

    return (
        <Modal
            title={initialValues ? 'Sửa Danh Mục' : 'Thêm Danh Mục'}
            open={visible}
            onCancel={onCancel}
            footer={null} // Xóa các nút mặc định của Modal
        >
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[
                        { required: true, message: 'Vui lòng nhập tên Danh Mục' },
                        { min: 3, message: 'Tên danh mục ít nhất 3 ký tự' },
                    ]}
                >
                    <Input autoComplete='off'/>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả' },
                        { min: 5, message: 'Mô tả danh mục ít nhất 5 ký tự' },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="imageUpload"
                    label="Ảnh Sản Phẩm"
                    rules={[{ required: !fileList.length, message: 'Vui lòng tải lên ảnh sản phẩm!' }]}
                    >
                    <Upload
                        beforeUpload={() => false} // Prevent auto-upload
                        listType="picture"
                        maxCount={1} // Allow only one file
                        fileList={fileList} // Set the current file list
                        onChange={handleChange} // Handle changes in file lis
                        onRemove={() => setFileList([])}
                    >
                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                    </Upload>
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
export default CategoryForm;
