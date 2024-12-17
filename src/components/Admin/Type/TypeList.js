// src/components/Category/CategoryList.js
import React from 'react';
import { Table, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const TypeList = ({ types, onEdit, onDelete }) => {
    const handleDelete = (id) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa loại này?',
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
        { title: 'Tên Loại', dataIndex: 'name', key: 'name' },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        {
            title: 'Hành Động',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button 
                        style={{ marginBottom: '10px', backgroundColor: 'darkturquoise', color: 'white' }}
                        icon={<EditOutlined />} 
                        onClick={() => onEdit(record)}
                    > 
                    </Button>
                    <Button 
                         style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }}
                        danger 
                        icon={<DeleteOutlined />} 
                        onClick={() => handleDelete(record.id)}
                    >
                    </Button>
                </div>
            ),
        },
    ];

    return <Table dataSource={types} rowKey="id" columns={columns} />;
};

export default TypeList;