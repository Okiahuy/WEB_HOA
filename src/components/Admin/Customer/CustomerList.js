// src/components/Category/CategoryList.js
import React from 'react';
import { Table} from 'antd';
// import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// const { confirm } = Modal;

const CustomerList = ({ customers, onEdit, onDelete }) => {
    // const handleDelete = (id) => {
    //     confirm({
    //         title: 'Bạn có chắc chắn muốn xóa loại này?',
    //         icon: <ExclamationCircleOutlined />,
    //         content: 'Thao tác này không thể hoàn tác!',
    //         okText: 'Xóa',
    //         okType: 'danger',
    //         cancelText: 'Hủy',
    //         onOk() {
    //             onDelete(id);
    //         },
    //         onCancel() {
    //             console.log('Hủy thao tác xóa');
    //         },
    //     });
    // };
    const columns = [
        { title: 'Mã', dataIndex: 'accountID', key: 'accountID' },
        { title: 'Tên Đầy Đủ', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Tên đăng nhập', dataIndex: 'userName', key: 'userName' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Đăng xuất cuối cùng', dataIndex: 'lastLogin', key: 'lastLogin' },
        { title: 'Ngày tạo', dataIndex: 'create', key: 'create' },
        // {
        //     title: 'Hành Động',
        //     key: 'actions',
        //     render: (_, record) => (
        //         <div>
        //             <Button 
        //                 style={{ marginBottom: '10px', backgroundColor: 'darkturquoise', color: 'white' }}
        //                 icon={<EditOutlined />} 
        //                 onClick={() => onEdit(record)}
        //             > 
        //             </Button>
        //             <Button 
        //                  style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }}
        //                 danger 
        //                 icon={<DeleteOutlined />} 
        //                 onClick={() => handleDelete(record.id)}
        //             >
        //             </Button>
        //         </div>
        //     ),
        // },
    ];

    return <Table dataSource={customers} rowKey="id" columns={columns} />;
};

export default CustomerList;