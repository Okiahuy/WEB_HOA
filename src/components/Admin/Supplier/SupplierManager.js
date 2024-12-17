// src/components/Supplier/SupplierManager.js
import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import SupplierList from './SupplierList'; 
import SupplierForm from './SupplierForm';

import {
    fetchSupplier,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    searchSuppliers,
} from '../../../services/supplierService';

const SupplierManager = () => {
    
    const [suppliers, setSuppliers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    useEffect(() => {
        loadSupplier();
    }, []);

    const loadSupplier = async () => {
        try {
            const data = await fetchSupplier();
            setSuppliers(data);
        } catch {
            message.error('Có lỗi xảy ra khi tải Nhà Cung Cấp!');
        }
    };

    const handleAddEditSupplier = async (values) => {
        try {
            if (editingSupplier) {
                await updateSupplier(editingSupplier.id, values);
                message.success('Cập nhật Nhà Cung Cấp thành công');
            } else {
                await addSupplier(values);
                message.success('Thêm Nhà Cung Cấp thành công');
            }
            loadSupplier();
            setIsModalVisible(false);
        } catch {
            message.error('Có lỗi xảy ra khi thêm/sửa Nhà Cung Cấp!');
        }
    };

    const handleDeleteSupplier = async (id) => {
        try {
            await deleteSupplier(id);
            message.success('Xóa Nhà Cung Cấp thành công');
            loadSupplier();
        } catch (error) {
            const errorMessage = error.message || 'Có lỗi xảy ra khi xóa danh mục!';
            message.error(errorMessage);
        }
    };

    const handleSearchSupplier = async (name) => {
        try {
            const data = await searchSuppliers(name);
            setSuppliers(data);
        } catch {
            message.error('Có lỗi xảy ra khi tìm kiếm Nhà Cung Cấp!');
        }
    };

    const openModal = (Supplier = null) => {
        setEditingSupplier(Supplier);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingSupplier(null);
    };

    return (
        <div>
            <Input.Search
                placeholder="Tìm kiếm Nhà Cung Cấp..."
                onSearch={handleSearchSupplier}
                style={{ width: 300, margin: '10px 0' }}
            /> <br></br>
            <Button style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }} onClick={() => openModal()}>
                Thêm mới
            </Button>
            
            <SupplierList
                suppliers={suppliers}
                onEdit={openModal}
                onDelete={handleDeleteSupplier}
            />

            <SupplierForm
                visible={isModalVisible}
                onOk={(values) => handleAddEditSupplier(values)}
                onCancel={closeModal}
                initialValues={editingSupplier}
            />
        </div>
    );
};

export default SupplierManager;