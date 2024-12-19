// src/components/Type/TypeManager.js
import React, { useState, useEffect } from 'react';
import {  message } from 'antd';
import CustomerList from './CustomerList';
// import TypeForm from './TypeForm';
import {
    fetchCustomer,
} from '../../../services/customerService';

const CustomerManager = () =>{
    const [customers, setCustomers] = useState([]);
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [editingType, setEditingType] = useState(null);
    useEffect(() => {
        loadTypes();
    }, []);

    const loadTypes = async () => {
        try {
            const data = await fetchCustomer();
            setCustomers(data);
        } catch {
            message.error('Có lỗi xảy ra khi tải loại !');
        }
    };

    // const handleAddEditType = async (values) => {
    //     try {
    //         if (editingType) {
    //             await updateType(editingType.id, values);
    //             message.success('Cập nhật loại  thành công');
    //         } else {
    //             await addType(values);
    //             message.success('Thêm loại  thành công');
    //         }
    //         loadTypes();
    //         setIsModalVisible(false);
    //     } catch {
    //         message.error('Có lỗi xảy ra khi thêm/sửa loại !');
    //     }
    // };

    // const handleDeleteType = async (id) => {
    //     try {
    //         await deleteType(id);
    //         message.success('Xóa loại  thành công');
    //         loadTypes();
    //     } catch (error) {
    //         const errorMessage = error.message || 'Có lỗi xảy ra khi xóa loại !';
    //         message.error(errorMessage);
    //     }
    // };

    // const handleSearchType = async (name) => {
    //     try {
    //         const data = await searchTypes(name);
    //         setTypes(data);
    //     } catch {
    //         message.error('Có lỗi xảy ra khi tìm kiếm loại !');
    //     }
    // };

    // const openModal = (Type = null) => {
    //     setEditingType(Type);
    //     setIsModalVisible(true);
    // };

    // const closeModal = () => {
    //     setIsModalVisible(false);
    //     setEditingType(null);
    // };

    return (
        <div>

            <CustomerList
                customers={customers}
                // onEdit={openModal}
                // onDelete={handleDeleteType}
            />
            
        </div>
    );
};
export default CustomerManager;
