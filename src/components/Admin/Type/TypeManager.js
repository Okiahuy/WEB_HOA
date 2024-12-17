// src/components/Type/TypeManager.js
import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import TypeList from './TypeList'; 
import TypeForm from './TypeForm';
import {
    fetchTypes,
    addType,
    updateType,
    deleteType,
    searchTypes,
} from '../../../services/typeService';

const TypeManager = () =>{
    const [types, setTypes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingType, setEditingType] = useState(null);
    useEffect(() => {
        loadTypes();
    }, []);

    const loadTypes = async () => {
        try {
            const data = await fetchTypes();
            setTypes(data);
        } catch {
            message.error('Có lỗi xảy ra khi tải loại !');
        }
    };

    const handleAddEditType = async (values) => {
        try {
            if (editingType) {
                await updateType(editingType.id, values);
                message.success('Cập nhật loại  thành công');
            } else {
                await addType(values);
                message.success('Thêm loại  thành công');
            }
            loadTypes();
            setIsModalVisible(false);
        } catch {
            message.error('Có lỗi xảy ra khi thêm/sửa loại !');
        }
    };

    const handleDeleteType = async (id) => {
        try {
            await deleteType(id);
            message.success('Xóa loại  thành công');
            loadTypes();
        } catch (error) {
            const errorMessage = error.message || 'Có lỗi xảy ra khi xóa loại !';
            message.error(errorMessage);
        }
    };

    const handleSearchType = async (name) => {
        try {
            const data = await searchTypes(name);
            setTypes(data);
        } catch {
            message.error('Có lỗi xảy ra khi tìm kiếm loại !');
        }
    };

    const openModal = (Type = null) => {
        setEditingType(Type);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingType(null);
    };

    return (
        <div>
            <Input.Search
                placeholder="Tìm kiếm loại ..."
                onSearch={handleSearchType}
                style={{ width: 300, margin: '10px 0' }}
            /> <br></br>
            <Button style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }} onClick={() => openModal()}>
                Thêm mới
            </Button>
            
            <TypeList
                types={types}
                onEdit={openModal}
                onDelete={handleDeleteType}
            />

            <TypeForm
                visible={isModalVisible}
                onOk={(values) => handleAddEditType(values)}
                onCancel={closeModal}
                initialValues={editingType}
            />
        </div>
    );
};
export default TypeManager;
