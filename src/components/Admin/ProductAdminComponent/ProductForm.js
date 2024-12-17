// src/components/ProductForm.js
import React , { useEffect, useState }from 'react';
import { Modal, Form, Input, InputNumber, Button, Upload, Select, Row, Col} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import productService from '../../../services/productService';
import menuService from '../../../services/menuService';

const { Option } = Select;

const ProductForm = ({visible, onCancel, onOk, initialValues }) => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [types, setTypes] = useState([]);

  const [fileList, setFileList] = useState([]); // State to manage file list

  const handleChange = ({ fileList }) => {
      setFileList(fileList); // Update state with the new file list
  };

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
    useEffect(() => {
      const fetchData = async () => {
          try {
            const categoriesResponse = await menuService.fetchCategories();
            const suppliersResponse = await menuService.fetchSuppliers();
            const typesResponse = await menuService.fetchTypes();

              console.log('Categories:', categoriesResponse);
              console.log('Suppliers:', suppliersResponse);
              console.log('Types:', typesResponse);

              setCategories(categoriesResponse.data); // Ensure this matches your response structure
              setSuppliers(suppliersResponse.data);
              setTypes(typesResponse.data); // This line should be correct as per your log output
          } catch (error) {
              console.error('Có lỗi xảy ra khi tải dữ liệu:', error);
          }
      };
  
      fetchData();
  }, []); 

  const handleSubmit = async () => {
    try {
        // Validate the form fields
        const values = await form.validateFields(); // No need to redeclare values here

        // Create a FormData object to send data
        const formData = new FormData();
        
        // Add values to FormData
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('quantity', values.quantity);
        formData.append('disPrice', values.disPrice);
        formData.append('description', values.description)
        formData.append('categoryId', values.categoryId);
        formData.append('supplierId', values.supplierId);
        formData.append('typeId', values.typeId);
        formData.append('typeProduct', values.typeProduct);
        
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
      title={initialValues ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
       form={form} layout="vertical" onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Tên Sản Phẩm"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' },
            { min: 5, message: 'tên sản phẩm ít nhất 5 ký tự' },
          ]}
        >
          <Input min={5}/>
        </Form.Item>
        <Form.Item
          name="price"
          label="Giá"
          rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
          name="disPrice"
          label="% Giảm Giá"
          rules={[{ required: true, message: 'Vui lòng nhập phần trăm giảm giá cho sản phẩm!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô Tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' },
            
            { min: 5, message: 'Mô tả sản phẩm ít nhất 5 ký tự' },]}
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
        
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="categoryId"
                  label="Danh Mục"
                  rules={[{ required: true, message: 'Vui lòng nhập danh mục cho sản phẩm!' }]}
                >
                  <Select placeholder="Chọn danh mục" style={{ width: '100%' }}>
                    {Array.isArray(categories) && categories.map(category => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item
                  name="supplierId"
                  label="Nhà Cung Cấp"
                  rules={[{ required: true, message: 'Vui lòng nhập nhà cung cấp cho sản phẩm!' }]}
                >
                  <Select placeholder="Chọn nhà cung cấp" style={{ width: '100%' }}>
                    {Array.isArray(suppliers) && suppliers.map(supplier => (
                      <Option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="typeId"
                  label="Loại hoa"
                  rules={[{ required: true, message: 'Vui lòng nhập phần loại hoa cho sản phẩm!' }]}
                >
                  <Select placeholder="Chọn loại hoa" style={{ width: '100%' }}>
                    {Array.isArray(types) && types.map(type => (
                      <Option key={type.id} value={type.id}>
                        {type.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
              <Form.Item
                  name="typeProduct"
                  label="Thuộc loại"
                  rules={[{ required: true, message: 'Vui lòng nhập phần loại cho sản phẩm!' }]}
                >
                  <Select placeholder="Chọn loại hoa thuộc loại" style={{ width: '100%' }}>
                    <Option key={1} value={1}>Hoa</Option>
                    <Option key={2} value={2}>Dụng cụ</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
  

        <Form.Item>
          <Button
            style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }}
            htmlType="submit"> {initialValues ? 'Cập nhật' : 'Thêm mới'}

          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
