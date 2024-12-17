// src/components/ProductManager.js
import React, { useState, useEffect } from 'react';
import { Button, Spin, Alert, message } from 'antd';
import productService from '../../../services/productService';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const typeProduct = 1; // Loại sản phẩm
  const page = 1; // Trang đầu tiên
  const pageSize = 50; // Số sản phẩm mỗi trang

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProductsByType(typeProduct, page, pageSize);
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleAddEditCategory = async (formData) => {
    try {
        if (editingProduct) {
            await productService.updateProduct(editingProduct.id, formData);
            message.success('Cập nhật sản phẩm thành công');
        } else {
          await productService.AddProducts(formData);
            message.success('Thêm sản phẩm thành công');
            console.log(formData);
        }
        loadProducts();
        setIsModalVisible(false);
      } catch {
        message.error('Có lỗi xảy ra khi thêm/sửa sản phẩm!');
      }
  };
    const handleDeleteProduct = async (id) => {
      try {
          await productService.DeleteProduct(id);
          message.success('Xóa sản phẩm thành công');
          loadProducts();
      } catch {
          message.error('Có lỗi xảy ra khi xóa sản phẩm!');
      }
  };
    const openModal = (product = null) => {
        setEditingProduct(product);
        setIsModalVisible(true);
    };
    const closeModal = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
    };
    if (loading) {
      return (
        <Spin spinning={true} tip="Đang tải...">
          <div>Đang tải sản phẩm...</div>
        </Spin>
      )
    }
  if (error) return <Alert message="Có lỗi xảy ra" type="error" />;

  return (
    <div>
      <Button 
       style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }} 
        onClick={() => openModal()}>Thêm Sản Phẩm</Button>

      <ProductList
        products={products}
        onEdit={openModal}
        onDelete={handleDeleteProduct} 
         />

        <ProductForm
            visible={isModalVisible}
            onOk={(formData) => handleAddEditCategory(formData)}
            onCancel={closeModal}
            initialValues={editingProduct}
        />
    </div>
  );
};

export default ProductManager;
