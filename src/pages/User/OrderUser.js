import React from 'react';
import OrderHistory from '../../components/User/orderUser/OrderHistory';
import Service from '../../components/User/about/service';

const OrderUser = () => {
  return (
    <div>
    
      {/* Đơn hàng của tui */}
      <OrderHistory/>
     
      {/* dịch vụ */}
      <Service/>
    </div>
  );
  };
  
  export default OrderUser; // Export mặc định