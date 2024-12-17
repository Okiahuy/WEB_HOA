import axios from 'axios';
const API_URL = 'http://localhost:5031/api/Orders';
const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

if (user) {
    const Token = user.token; // Lấy Token
    console.log('Token:', Token); // In ra Token để kiểm tra
} else {
    console.log('Không có người dùng đăng nhập.');
}
const OrderService = {

  // Thanh toán sản phẩm giỏ hàng
    Buy: async (orderData) => {
        try {
            // Gửi yêu cầu POST với dữ liệu JSON
            const response = await axios.post(`${API_URL}/buy`, orderData,{
                headers: {
                    'Content-Type': 'application/json', // Loại dữ liệu gửi
                },
            });
            console.log("Thanh toán thành công:", response.data);
            return response.data; // Trả về dữ liệu phản hồi
        } catch (error) {
            if (error.response) {
                console.error("Lỗi từ server:", error.response.data);
            } else {
                console.error("Lỗi không xác định:", error.message);
            }
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },

    // Thanh toán sản phẩm giỏ hàng bằng momo
    Momo: async (orderData) => {
        try {
            // Gửi yêu cầu POST với dữ liệu JSON
            const response = await axios.post(`${API_URL}/payment`, orderData,{
                headers: {
                    'Content-Type': 'application/json', // Loại dữ liệu gửi
                },
            });
            console.log("Thanh toán thành công:", response.data);
            return response.data; // Trả về dữ liệu phản hồi
        } catch (error) {
            if (error.response) {
                console.error("Lỗi từ server:", error.response.data);
            } else {
                console.error("Lỗi không xác định:", error.message);
            }
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
    //người dùng
    getOrderByaccountID: async (accountID) => {
        try {
            const response = await axios.get(`${API_URL}/GetOrdersByAccountID/${accountID}`, {
              headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
              },
            });
            return response.data; 
          } catch (error) {
            console.error('Có lỗi xảy ra khi lấy đơn hàng theo accountID:', error);
            throw error; 
          }
    },
    //người dùng
    getOrderDetailByOrderId: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/GetOrderDetailsByOrderID/${id}`, {
              headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
              },
            });
            return response.data; 
          } catch (error) {
            console.error('Có lỗi xảy ra khi lấy đơn hàng chi tiết theo id:', error);
            throw error; 
          }
    },
    //admin
    getOrdePrint: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/getOrderDetailPrint/${id}`, {
              headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
                Authorization: `Bearer ${user.token}`, // Add token to header
              },
            });
            return response.data; 
          } catch (error) {
            console.error('Có lỗi xảy ra khi lấy đơn hàng chi tiết theo id:', error);
            throw error; 
          }
    },
    //admin
    getAllOrder: async () => {
        try {
            const response = await axios.get(`${API_URL}`, {
              headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
                Authorization: `Bearer ${user.token}`, // Add token to header
              },
            });
            return response.data; 
          } catch (error) {
            console.error('Có lỗi xảy ra khi lấy đơn hàng chi tiết theo id:', error);
            throw error; 
          }
    },
    updateStatus_Order: async (orderID, status_order) => {
        try {
            // Gọi API PUT với axios
            const response = await axios.put(`${API_URL}/${orderID}/status`, {
                orderID,      // Truyền orderID vào body nếu cần
                status_order,    // Truyền addressID vào body
              });    
            // Kiểm tra nếu có lỗi từ API
            if (response.status !== 200) {
                console.log(orderID,status_order); 
                throw new Error(response.data.message || 'Lỗi hệ thống');
            }
            // Trả về dữ liệu thành công từ API
            return response.data;
        } catch (error) {
            console.log(orderID,status_order); 
            // Xử lý lỗi và trả về thông báo thích hợp
            throw new Error(error.response?.data?.message || 'Không thể kết nối với máy chủ');
        }
    },
};

export default OrderService;
