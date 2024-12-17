// src/services/addressService.js
import axios from 'axios';
const API_URL = 'http://localhost:5031'; 


const user = JSON.parse(localStorage.getItem('user'));


const addressService = {

    addAddress: async (address) => {
        try {
            const response = await axios.post(`${API_URL}/api/address/Add`, address, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm địa chỉ:', error);
            throw error; // Ném lỗi lên để xử lý ở nơi gọi service nếu cần
        }
    },

    getAddressByAccountID: async (accountID) => {
        try {
            const response = await axios.get(`${API_URL}/api/address/getAddressbyID/${accountID}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data; // Return the data directly
        } catch (error) {
            console.error('Có lỗi xảy ra khi tải Địa chỉ:', error,user.accountID);
            throw error; // Ném lỗi lên để xử lý ở nơi gọi service nếu cần
        }
    },

    updateAddressForUser: async (addressID, address) => {
        try {
            const response = await axios.put(`${API_URL}/api/address/Update/${addressID}`, address, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.status >= 200 && response.status < 300) {
                console.log('Cập nhật địa chỉ thành công:', response.data);
                return response.data; // Return the updated address data for further usage
            } else {
                console.error('Cập nhật địa chỉ thất bại:', response.status, response.statusText);
                throw new Error(`Cập nhật địa chỉ thất bại: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật địa chỉ:', error.message);
            throw error; // Rethrow the error for handling in the caller
        }
    },
    

    deleteAddress: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/address/${id}`);
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            } else {
                console.error('Xóa địa chỉ thất bại:', response.status, response.statusText);
                throw new Error('Xóa địa chỉ thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi xóa địa chỉ:', error.message);
            throw error;
        }
    },
    

    updateAddress: async (orderID, addressID) => {
        try {
            // Gọi API PUT với axios
            const response = await axios.put(`${API_URL}/api/orders/${orderID}/update-address`, {
                orderID,      // Truyền orderID vào body nếu cần
                addressID,    // Truyền addressID vào body
                accountID: user.accountID, // Truyền userID
              });
            console.log(orderID,addressID);           
            // Kiểm tra nếu có lỗi từ API
            if (response.status !== 200) {
                console.log(orderID,addressID); 
                throw new Error(response.data.message || 'Lỗi hệ thống');
                
            }
            // Trả về dữ liệu thành công từ API
            return response.data;
        } catch (error) {
            console.log(orderID,addressID); 
            // Xử lý lỗi và trả về thông báo thích hợp
            throw new Error(error.response?.data?.message || 'Không thể kết nối với máy chủ');
        }
    },
    
};

export default addressService;