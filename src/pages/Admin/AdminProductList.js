// src/pages/Admin/ProductList.js
import React from 'react';

import ProductManager from '../../components/Admin/ProductAdminComponent/ProductManager';

const AdminProductList = () => {
  return (
    <div>
      <h1>Danh Sách Sản Phẩm</h1>
      <ProductManager /> {/* Hiển thị danh sách sản phẩm */}
    </div>
  );
};


export default AdminProductList;
