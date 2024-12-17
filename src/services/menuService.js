// src/services/menuService.js
import axios from 'axios';

const API_URL = 'http://localhost:5031'; 


const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    const Token = user.token; 
    console.log('Token:', Token); 
} else {
    console.log('.');
   
}
const menuService = {
    fetchCategories: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/category`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            return response.data; // Return the data directly
        } catch (error) {
            console.error('Có lỗi xảy ra khi tải danh mục:', error);
            throw error; // Ném lỗi lên để xử lý ở nơi gọi service nếu cần
        }
    },

    fetchSuppliers: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/supplier`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            return response.data; // Return the data directly
        } catch (error) {
            console.error('Có lỗi xảy ra khi tải nhà cung cấp:', error);
            throw error; // Ném lỗi lên để xử lý ở nơi gọi service nếu cần
        }
    },

    fetchTypes: async () => {
        try {
            const response = await axios.get(`${API_URL}/api/type`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
            return response.data; // Return the data directly
        } catch (error) {
            console.error('Có lỗi xảy ra khi tải loại:', error);
            throw error; // Ném lỗi lên để xử lý ở nơi gọi service nếu cần
        }
    }
};

export default menuService;