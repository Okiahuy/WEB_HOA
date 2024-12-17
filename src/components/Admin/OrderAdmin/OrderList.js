import React, { useEffect, useState } from 'react';
import { Alert, Button, message, Select, Spin, Table } from 'antd';
import OrderService from '../../../services/orderService';
import { EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;


const OrderList = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    loadOrders();
  }, []);
  
  const loadOrders = async () => {
    try {
      // Gọi API để lấy danh sách đơn hàng
      const response = await OrderService.getAllOrder();
      const fetchedOrders = response.data;
      setOrders(fetchedOrders);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

const getStatusLabel = (status) => {
    switch (status) {
      case 1: return 'Mới';
      case 2: return 'Duyệt';
      case 3: return 'Đang giao';
      case 4: return 'Đã nhận';
      case 5: return 'Đã hủy';
      default: return 'Không xác định';
    }
  };
  // Chức năng cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await OrderService.updateStatus_Order(orderId, newStatus);
      if (response.data) {
        message.success('Trạng thái đơn hàng được cập nhật thành công');
        loadOrders();
      }
    } catch (error) {
      message.error('Không cập nhật được trạng thái đơn hàng');
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
    return <Alert message="Có lỗi xảy ra" type="error" />;
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
        title: 'Tên Người Dùng',
        dataIndex: 'accountName',
        key: 'accountName',
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
        dataIndex: 'addressName',
        key: 'addressName',
      },
    {
      title: 'Chi Tiết',
      key: 'details',
      render: (_, record) => (
        <Button
            style={{ background: 'white', }}
            onClick={() => navigate(`/orderDetail/${record.id}`)}
        >
         <EyeOutlined/>
        </Button>
      ),
    },
    {
        title: 'Trạng Thái',
        dataIndex: 'status_order',
        key: 'status_order',
        render: (status_order) => getStatusLabel(status_order), // Hàm chuyển trạng thái
      },
      {
        title: 'In đơn',
        key: 'print',
        render: (_, record) => (
          <Button
              style={{ background: 'white', }}
              onClick={() => navigate(`/admin/order-print/${record.id}`)}
          >
           <PrinterOutlined/>
          </Button>
        ),
      },
      {
        title: 'Cập nhật trạng thái',
        key: 'status',
        render: (_, record) => (
          <Select
            defaultValue={record.status_order}
            style={{ width: 120 }}
            onChange={(value) => updateOrderStatus(record.id, value)}
          >
            <Option value={1}>Mới</Option>
            <Option value={2}>Duyệt đơn</Option>
            <Option value={3}>Giao hàng</Option>
            <Option value={4}>Hoàn Thành</Option>
            <Option value={5}>Hủy đơn</Option>
          </Select>
        ),
      },

  ];

  return (
    <div>
      <h2>Lịch sử Đặt Hàng</h2>
      {loading ? (
        <Spin size="large" />
      ) : orders?.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <Table columns={columns} dataSource={orders} pagination={{ pageSize: 10 }} />
      )}
    </div>
  );
};

export default OrderList;
