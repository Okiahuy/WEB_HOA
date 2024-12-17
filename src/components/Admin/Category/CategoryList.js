// src/components/Category/CategoryList.js
import React from 'react';
import { Table, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const CategoryList = ({ categories, onEdit, onDelete }) => {
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
        { title: 'Mã', dataIndex: 'id', key: 'id' },
        { title: 'Tên Danh Mục', dataIndex: 'name', key: 'name' },
        {
            title: 'Ảnh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (url) => (
              <img src={`http://localhost:5031${url}`} alt="product" style={{ width: '50px', height: '50px' }} />
            ),
        },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Hành Động',
            key: 'actions',
            render: (_, category) => (
                <div>
                    <Button 
                        style={{ marginBottom: '10px', backgroundColor: 'darkturquoise', color: 'white' }}
                        icon={<EditOutlined />} 
                        onClick={() => onEdit(category)}
                    > 
                    </Button>
                    <Button 
                         style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }}
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(category.id)}
                    >
                    </Button>
                </div>
            ),
        },
    ];

    return <Table dataSource={categories} rowKey="id" columns={columns}  pagination={{ pageSize: 5 }} />;
};

export default CategoryList;