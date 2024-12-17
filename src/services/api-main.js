import axios from 'axios';

const ApiMain = axios.create({
  baseURL: 'http://localhost:5031/api', // URL cơ sở
  timeout: 5000, // Thời gian chờ tối đa cho mỗi request
  headers: {
    'Content-Type': 'application/json', // Định dạng dữ liệu
  },
});

// Interceptor để xử lý token nếu cần
ApiMain.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ApiMain.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi chung, ví dụ thông báo lỗi
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default ApiMain;
