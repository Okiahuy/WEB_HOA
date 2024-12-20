import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Select, Spin, Table, Tag } from 'antd';
import OrderService from '../../../services/orderService';
import addressService from '../../../services/addressService';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

const OrderHistory = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [currentOrderID, setCurrentOrderID] = useState(null);
  const [userAddresses, setuserAddressess] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
  const accountID = user?.accountID;
  if (user) {
      const FullName = user.fullName; // Lấy Token
      console.log('User:', FullName); // In ra Token để kiểm tra
  } else {
      console.log('');
  }

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await OrderService.getOrderByaccountID(accountID);
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (accountID) {
      loadOrders();
    }
  }, [accountID]);
  
  
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
  
  const handleChangeAddress = (orderID) => {
    console.log("orderID:", orderID);  // Kiểm tra orderID
    setIsAddressModalVisible(true);
    setCurrentOrderID(orderID);
  };
  
  const handleAddressUpdate = async () => {
    // Kiểm tra xem có đơn hàng và địa chỉ mới đã được chọn không
    if (!currentRecord || !currentRecord.newAddress) {
      message.error("Vui lòng chọn địa chỉ mới.");
      return;
    }

    try {
      // Gọi service để cập nhật địa chỉ
      const response = await addressService.updateAddress(currentOrderID, currentRecord.newAddress);
      console.log("Response:", response);
      if (Array.isArray(response.data)) {
        
      }
      
      if (response && response.data) {
        message.success(response.message || "Cập nhật địa chỉ thành công!");
        setIsAddressModalVisible(false); // Đóng modal sau khi cập nhật thành công
          const response1 = await OrderService.getOrderByaccountID(accountID);
          setOrders(response1.data);
      } else {
        message.error(response.message || "Không thể cập nhật địa chỉ.");
      }
    } catch (error) {
      // Xử lý lỗi và thông báo
      message.error("Không thể cập nhật địa chỉ.");
      console.error(error.message); // Ghi log lỗi nếu cần
    }
};
  // Chức năng cập nhật trạng thái đơn hàng
const handleCancelOrder = (orderId) => {
  Modal.confirm({
    title: 'Xác nhận hủy đơn hàng',
    content: 'Bạn có chắc chắn muốn hủy đơn hàng này không?',
    onOk: async () => {
      try {
        const response = await OrderService.updateStatus_Order(orderId, 5);
        if (response.data) {
          message.success('Đơn hàng đã được hủy thành công');
          const response1 = await OrderService.getOrderByaccountID(accountID);
          setOrders(response1.data);
        }
      } catch (error) {
        message.error('Hủy đơn hàng thất bại');
        console.error(error);
      }
    },
  });
};
 // Chức năng cập nhật trạng thái đơn hàng
 const handleTakeOrder = (orderId) => {
  Modal.confirm({
    title: 'Nhận hàng',
    content: 'Bạn có chắc chắn muốn nhận đơn hàng này không?',
    onOk: async () => {
      try {
        const response = await OrderService.updateStatus_Order(orderId, 4);
        if (response.data) {
          message.success('Đơn hàng đã được nhận thành công');
          const response1 = await OrderService.getOrderByaccountID(accountID);
          setOrders(response1.data);
        }
      } catch (error) {
        message.error('Nhận đơn hàng thất bại');
        console.error(error);
      }
    },
  });
};

const getStatusLabel = (status) => {
  switch (status) {
    case 1: return 'Mới';
    case 2: return 'Đã Duyệt';
    case 3: return 'Đang giao';
    case 4: return 'Đã nhận';
    case 5: return 'Đã hủy';
    default: return 'Không xác định';
  }
};
  const getPaymentMethod = (paymentID) => {
    switch (paymentID) {
      case 1:
        return 'Thanh toán khi nhận hàng';
      case 2:
        return 'Thanh toán bằng MoMo';
      case 3:
        return 'Thanh toán bằng VNPay';
      default:
        return 'Không rõ';
    }
  };

  if (loading) {
    return (
      <Spin spinning={true} tip="Đang tải...">
        <div>Đang tải sản phẩm...</div>
      </Spin>
    )
  }

  if (error) {
    console.log("Chưa có đơn hàng nào",error);
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (order_date) => <span>{new Date(order_date).toLocaleDateString('vi-VN')}</span>,
    },
    {
      title: 'Mã Đơn',
      dataIndex: 'code_order',
      key: 'code_order',
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Phương Thức Thanh Toán',
      dataIndex: 'paymentID',
      key: 'paymentID',
      render: (paymentID) => <span>{getPaymentMethod(paymentID)}</span>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'tong',
      key: 'tong',
      render: (tong, record) => {
        let color = 'green';
        const isDelivering = record.status_order === 3 || record.status_order === 4 || record.status_order === 5; // Kiểm tra nếu đơn hàng đang giao
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Tag color={color} style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {tong}
            </Tag>
            {/* Disable the button if the order is being delivered */}
            <Button 
              type="link" 
              onClick={() => handleChangeAddress(record.id)} 
              disabled={isDelivering}  // Disable if the order is in "Đang giao" status
              style={{ color: isDelivering ? 'gray' : 'blue' }} // Change button color when disabled
            >
              {isDelivering ? 'Không thể đổi địa chỉ' : 'Đổi địa chỉ'}
            </Button>
          </div>
        );
      },
    }
    ,
    {
      title: 'Trạng Thái',
      dataIndex: 'status_order',
      key: 'status_order',
      render: (status_order, record) => {
        const canCancel = status_order === 1; // Chỉ trạng thái 1
        const isDelivering = status_order === 3; // Chỉ trạng thái 3
        return (
          <div style={{width:'200px', alignItems:'center'}}>
            {getStatusLabel(status_order)} {/* Hàm chuyển đổi trạng thái thành label */}
            {canCancel && (
              <Button style={{width:'50%'}} danger onClick={() => handleCancelOrder(record.id)}>
                Hủy
              </Button>
            )}
            {isDelivering && (
              <Button style={{width:'50%'}} onClick={() => handleTakeOrder(record.id)}>
                Nhận
              </Button>
            )}
          </div>
        );
      },
    },
    
    {
      title: 'Xem Chi Tiết',
      key: 'details',
      render: (_, record) => (
        <Button
          onClick={() => navigate(`/orderDetail/${record.id}`)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];
  

  return (
    <div>
      <h2>Lịch sử Đặt Hàng</h2>
      {orders != null ? (
        <Table columns={columns} dataSource={orders} pagination={{ pageSize: 10 }}/>
      ):(
        <h2>Chưa có đơn hàng nào!</h2>
      )
      }
      

      <Modal
          title="Đổi địa chỉ"
          visible={isAddressModalVisible}
          onOk={() => handleAddressUpdate()}
          onCancel={() => setIsAddressModalVisible(false)}
          okText="Xác nhận"
          cancelText="Hủy"
        >
          <p>Chọn địa chỉ mới cho đơn hàng:</p>
          <Select
            style={{ width: '100%' }}
            placeholder="Chọn địa chỉ mới"
            onChange={(value) => setCurrentRecord({ ...currentRecord, newAddress: value })}
          >
           {userAddresses.map((address) => (
              <Option key={address.addressID} value={address.addressID}>
                {address.addressName+" ,thành phố "+address.city}
              </Option>
            ))}
          </Select>
        </Modal>

    </div>
  );
};

export default OrderHistory;
