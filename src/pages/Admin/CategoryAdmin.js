import React from 'react';
import CategoryManager from '../../components/Admin/Category/CategoryManager';

const CategoryAdmin = () => {
    return (
        <div>
          <h1>Danh Sách Danh Mục Sản Phẩm</h1>
          <CategoryManager /> {/* Hiển thị danh sách sản phẩm */}
        </div>
      );
  };
  
  export default CategoryAdmin; // Export mặc định