import React from 'react';
import SupplierManager from '../../components/Admin/Supplier/SupplierManager';

const SupplierAdmin = () => {
    return (
        <div>
          <h1>Danh Sách Nhà Cung Cấp Sản Phẩm</h1>
          <SupplierManager /> {/* Hiển thị danh sách sản phẩm */}
        </div>
      );
  };
  
  export default SupplierAdmin; // Export mặc định