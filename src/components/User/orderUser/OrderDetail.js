import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Spin, Alert, Table, Steps } from 'antd';
import OrderService from '../../../services/orderService';
import './OrderProgress.css';

const { Step } = Steps;

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageURLs, setImageURLs] = useState({}); // Lưu hình ảnh theo productID


  useEffect(() => {
    const loadOrderDetail = async () => {
        setLoading(true);
        try {
          const response = await OrderService.getOrderDetailByOrderId(id);
          setOrderDetails(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      if (id) {
        loadOrderDetail();
      }
  }, [id]);


  useEffect(() => {
    const loadCart = async () => {
      try {
        // Lấy hình ảnh cho tất cả các sản phẩm trong giỏ hàng
        const updatedImageURLs = {};
        for (const item of orderDetails) {
          const response = await fetch(`http://localhost:5031/api/product/getImage/${item.productID}`);
          const data = await response.json();
          updatedImageURLs[item.productID] = data.imageURL; // Lưu hình ảnh vào state
        }
        setImageURLs(updatedImageURLs);
      } catch (error) {
        console.error('Lỗi khi lấy hình ảnh:', error);
      } finally {
        setLoading(false);
      }
    };
    if (orderDetails) {
      loadCart(); // Gọi hàm tải hình ảnh nếu có sản phẩm trong giỏ
    }
  }, [orderDetails]);

  const statuses = ['Chờ xác nhận', 'Đang xử lý', 'Đang giao hàng', 'Hoàn tất', 'Đã hủy'];
  const stepColors = ['#FF7F50', '#FFA500', '#1E90FF', '#32CD32', '#D3D3D3'];
  const currentIndex = (orderDetails[0]?.stt || 1) - 1;

  const customDot = (dot, { status, index }) => {
    return React.cloneElement(dot, {
      style: {
        ...dot.props.style,
        backgroundColor: currentIndex >= index ? stepColors[index] : '#ccc', // Default color if not completed
      },
    });
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'orderdetailID',
      key: 'orderdetailID',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'productID',
        key: 'imageURL',
        render: (productID) => {
          const imageURL = imageURLs[productID];
          return imageURL ? (
            <img src={imageURL} alt="Ảnh sản phẩm" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          ) : (
            <span>Không có ảnh</span>
          );
        },
      },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => <span>{record.price} đ</span>,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_, record) => <span>{record.quantity * record.price} đ</span>,
    },
  ];

  if (loading) {
    return <Spin tip="Đang tải chi tiết đơn hàng..." />;
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }

  return (
    <Card title={`Chi Tiết Đơn Hàng #${orderDetails[0]?.code}`}>
        <div className="order-progress-container">
        <p><strong>Trạng thái</strong></p>
            <Steps current={currentIndex} progressDot={customDot}>
                {statuses.map((stt, index) => (
                <Step key={index} title={stt} />
                ))}
            </Steps>
        </div>
      <Table 
        columns={columns} 
        dataSource={orderDetails} 
        rowKey="id" 
        pagination={false} 
        bordered 
      />
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <p><strong style={{ fontSize: '15px' }}>Ngày đặt hàng:</strong>{new Date(orderDetails[0]?.date).toLocaleDateString('vi-VN')}</p>
        
        <p><strong style={{ fontSize: '15px' }}>Tổng tiền:</strong> {orderDetails[0]?.ttprice.toLocaleString()}đ</p>
        <Link to="/order" style={{ fontSize: '15px' }} className="link-orderdetail">Quay lại</Link>
      </div>
    </Card>
  );
};

export default OrderDetail;
