import axios from 'axios'
// Địa chỉ API npm install axios 
const API_URL = 'http://localhost:5031/api/Admin';

const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

if (user) {
    const Token = user.token; // Lấy Token
    console.log('Token:', Token); // In ra Token để kiểm tra
   
} else {
   
    console.log('.');
}

const statisticService = {
  statistics: async () => {
    try {
        const response = await axios.get(`${API_URL}/statistics`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        if (error.response) {
          console.error("Có lỗi khi statistics :", error.response.data);
        } else {
            console.error("Có lỗi khi statistics:", error);
        }
        throw error;
    }
},
Middleware: async () => {
    try {
        const response = await axios.get(`${API_URL}/getMiddleware`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`, 
            },
        });
        return response.data; 
    } catch (error) {
        if (error.response) {
          console.error("Có lỗi khi getMiddleware :", error.response.data);
        } else {
            console.error("Có lỗi khi getMiddleware:", error);
        }
        throw error;
    }
},

};

export default statisticService;
