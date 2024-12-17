// src/pages/Admin/ProductList.js
import React from 'react';

import ProductManagerdungcu from '../../components/Admin/ProductAdminComponent/ProductManager-dungcu';

const AdminProductListdungcu = () => {
  return (
    <div>
      <h1>Danh Sách Dụng Cụ</h1>
      <ProductManagerdungcu /> {/* Hiển thị danh sách sản phẩm */}
    </div>
  );
};


export default AdminProductListdungcu;
