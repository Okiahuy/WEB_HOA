import React from 'react';
import CustomerManager from '../../components/Admin/Customer/CustomerManager';
const CustomerAdmin = () => {
    return (
        <div>
          <h1>Danh Sách Khách hàng</h1>
          <CustomerManager /> {/* Hiển thị danh sách sản phẩm */}
        </div>
      );
  };
  
  export default CustomerAdmin; // Export mặc định