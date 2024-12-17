import React from 'react';
import { Steps } from 'antd';
import './OrderProgress.css';

const { Step } = Steps;

const OrderProgress = ({ currentStatus }) => {
  // Các trạng thái đơn hàng
  const statuses = [
    'Chờ xác nhận',
    'Đang xử lý',
    'Đang giao hàng',
    'Hoàn tất',
  ];

  // Tìm vị trí hiện tại trong danh sách trạng thái
  const currentIndex = statuses.indexOf(currentStatus);

  return (
    <div className="order-progress-container">
      <Steps current={currentIndex} progressDot>
        {statuses.map((status, index) => (
          <Step key={index} title={status} />
        ))}
      </Steps>
    </div>
  );
};

export default OrderProgress;
