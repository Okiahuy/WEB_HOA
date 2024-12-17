import React, { useEffect, useState } from 'react';
import {  message, Spin, Button, List, Input, Modal, Form } from 'antd';
import addressService from '../../../services/addressService';
import { EditOutlined} from '@ant-design/icons';
const AddressUser = () => {
  const [loading, setLoading] = useState(true);
  const [userAddresses, setuserAddressess] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
  const [newAddress, setNewAddress] = useState({
    addressName: '',
    city: '',
    zipCode: '',
  });

  const accountID = user?.accountID;
  if (user) {
      const FullName = user.fullName; // Lấy Token
      console.log('User:', FullName); // In ra Token để kiểm tra
  } else {
      console.log('');
  }
  
  useEffect(() => {
    const loadAddress = async () => {
      if (!accountID) return; // Chỉ tải giỏ hàng nếu `accountID` tồn tại
      setLoading(false);
      try {
        const response = await addressService.getAddressByAccountID(accountID);

        if (response.data) {
          setuserAddressess(response.data);
        } 
      } catch (error) {
        setuserAddressess([]);
      } finally {
        setLoading(false);
      }
    };
    loadAddress();
  }, [accountID]);

  const handleAddAddressClick = () => {
    setIsAddModalVisible(true);
  };

  const handleAddAddressSubmit = async (values) => {
    try {
      const address = { ...values, accountID }; // Include the accountID
      const response = await addressService.addAddress(address); // Add address using POST
      setuserAddressess([...userAddresses, response.data]); // Update the address list
      message.success('Địa chỉ đã được thêm thành công!');
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Thêm địa chỉ thất bại.');
      console.error(error);
    }
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setNewAddress({ ...address }); // Pre-fill modal inputs with existing address data
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      await addressService.updateAddressForUser(selectedAddress.addressID, newAddress);
      const updatedAddresses = userAddresses.map((addr) =>
        addr.addressID === selectedAddress.addressID ? { ...addr, ...newAddress } : addr
      );
      setuserAddressess(updatedAddresses);
      setIsModalVisible(false);
      message.success('Cập nhật địa chỉ thành công');
    } catch (error) {
      message.error('Cập nhật địa chỉ không thành công');
    }
  };

  const handleDeleteAddress = async (id) => {
    Modal.confirm({
        title: 'Xác nhận xóa',
        content: 'Bạn có chắc chắn muốn xóa địa chỉ này không?',
        okText: 'Xóa',
        cancelText: 'Hủy',
        onOk: async () => {
            try {
                await addressService.deleteAddress(id);
                message.success('Xóa địa chỉ thành công!');
                setuserAddressess((prev) => prev.filter((addr) => addr.addressID !== id));
            } catch (error) {
                const errorMessage = 'Không thể xóa địa chỉ vì đã có đơn hàng sử dụng địa chỉ này!';
                message.error(errorMessage);
            }
        },
        onCancel: () => {
            message.info('Hủy xóa địa chỉ.');
        },
    });
};

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setNewAddress({ addressName: '', city: '', zipCode: '' }); // Reset form
  };
  
  if (loading) {
    return <Spin tip="Đang tải chi tiết đơn hàng..." />;
  }

  return (
    <div>
      <h3>Danh Sách Địa Chỉ</h3>
      <Button type="primary" onClick={handleAddAddressClick}>
        Thêm Địa Chỉ
      </Button>
      {userAddresses.length > 0 ? (
        <List
        itemLayout="horizontal"
        dataSource={userAddresses}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEditAddress(item)}
              >
                Sửa
              </Button>,
              <Button danger onClick={() => handleDeleteAddress(item.addressID)}>
              Xóa
            </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.addressName}
              description={`Thành phố: ${item.city} | Mã bưu điện: ${item.zipCode}`}
            />
            
          </List.Item>
          
        )}
        
      />
      
      ) : (
        <div>
          <p>Chưa có địa chỉ. Hãy thêm một địa chỉ mới.</p>
          
        </div>
      )}
    <Modal
        title="Chỉnh sửa địa chỉ"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Input
          value={newAddress.addressName}
          onChange={(e) => setNewAddress({ ...newAddress, addressName: e.target.value })}
          placeholder="Tên địa chỉ"
          style={{ marginBottom: 8 }}
        />
        <Input
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          placeholder="Thành phố"
          style={{ marginBottom: 8 }}
        />
        <Input
          value={newAddress.zipCode}
          onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
          placeholder="Mã bưu điện"
        />
      </Modal>

      <Modal
        title="Thêm Địa Chỉ Mới"
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
      >
        <Form onFinish={handleAddAddressSubmit}>
          <Form.Item
            label="Tên Địa Chỉ"
            name="addressName"
            rules={[{ required: true, message: 'Vui lòng nhập tên địa chỉ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thành Phố"
            name="city"
            rules={[{ required: true, message: 'Vui lòng nhập tên thành phố!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã Bưu Điện"
            name="zipCode"
            rules={[{ required: true, message: 'Vui lòng nhập mã bưu điện!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm Địa Chỉ
            </Button>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default AddressUser;
