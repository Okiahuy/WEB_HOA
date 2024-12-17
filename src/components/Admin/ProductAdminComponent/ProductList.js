// src/components/ProductList.js
import React from 'react';
import { Table, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
  const ProductList = ({ products, onEdit, onDelete }) => {
    
  const handleDelete = (id) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa danh mục này?',
            icon: <ExclamationCircleOutlined />,
            content: 'Thao tác này không thể hoàn tác!',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                onDelete(id);
            },
            onCancel() {
                console.log('Hủy thao tác xóa');
            },
        });
    };


    const columns = [
      {
        title: 'Mã Sản Phẩm',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Tên Sản Phẩm',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Giá',
        dataIndex: 'price',
        key: 'price',
        render: (price) => `${price} VND`,
      },
      {
        title: 'Giá Giảm',
        dataIndex: 'disPrice',
        key: 'disPrice',
        render: (disPrice) => `${disPrice} %`,
      },
      {
        title: 'Mô Tả',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Ảnh',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (url) => (
          <img src={`http://localhost:5031${url}`} alt="product" style={{ width: '50px', height: '50px' }} />
        ),
      },
      {
        title: 'Hành Động',
        key: 'action',
        render: (_, product) => (
          <div>
          <Button 
              style={{ marginBottom: '10px', backgroundColor: 'darkturquoise', color: 'white' }}
              icon={<EditOutlined />} 
              onClick={() => onEdit(product)}
          > 
          </Button>
          <Button 
               style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }}
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(product.id)}
          >
          </Button>
      </div>
        ),
      },
    ];
  
    return <Table dataSource={products} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />;
  };

export default ProductList;
