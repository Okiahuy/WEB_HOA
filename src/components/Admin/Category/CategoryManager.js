// src/components/Category/CategoryManager.js
import React, { useState, useEffect } from 'react';
import { Button, Input, message } from 'antd';
import CategoryList from './CategoryList'; 
import CategoryForm from './CategoryForm';

import {
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    searchCategories,
} from '../../../services/categoryService';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch {
            message.error('Có lỗi xảy ra khi tải danh mục!');
        }
    };

    const handleAddEditCategory = async (formData) => {
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, formData);
                message.success('Cập nhật danh mục thành công');
            } else {
                await addCategory(formData);
                message.success('Thêm danh mục thành công');
                console.log(formData);
            }
            loadCategories();
            setIsModalVisible(false);
        } catch {
            message.error('Có lỗi xảy ra khi thêm/sửa danh mục!');
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            message.success('Xóa danh mục thành công');
            loadCategories();
        } catch (error) {
            const errorMessage = error.message || 'Có lỗi xảy ra khi xóa danh mục!';
            message.error(errorMessage);
        }
    };

    const handleSearchCategory = async (name) => {
        try {
            const data = await searchCategories(name);
            setCategories(data);
        } catch {
            message.error('Có lỗi xảy ra khi tìm kiếm danh mục!');
        }
    };

    const openModal = (category = null) => {
        setEditingCategory(category);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingCategory(null);
    };

    return (
        <div>
            <Input.Search
                placeholder="Tìm kiếm danh mục..."
                onSearch={handleSearchCategory}
                style={{ width: 300, margin: '10px 0' }}
            /> <br></br>
            <Button style={{ marginBottom: '10px', backgroundColor: 'crimson', color: 'white' }} onClick={() => openModal()}>
                Thêm mới
            </Button>
            
            <CategoryList
                categories={categories}
                onEdit={openModal}
                onDelete={handleDeleteCategory}
            />

            <CategoryForm
                visible={isModalVisible}
                onOk={(formData) => handleAddEditCategory(formData)}
                onCancel={closeModal}
                initialValues={editingCategory}
            />
        </div>
    );
};

export default CategoryManager;