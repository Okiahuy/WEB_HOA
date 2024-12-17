import axios from 'axios';
const API_URL = 'http://localhost:5031/api/Cart';

const CartService = {
  // Lấy giỏ hàng theo accountID
  getCartByAccountID: async (accountID) => {
    try {
      const response = await axios.get(`${API_URL}/getCartbyID/${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      if (error.response) {
        console.error("Có lỗi khi lấy giỏ hàng:", error.response.data);
      } else {
        console.error("Có lỗi khi lấy giỏ hàng:", error);
      }
      throw error;
    }
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (accountID, productID, quantity) => {
    try {
        // Gửi đối tượng JSON trong body của yêu cầu POST
        const response = await axios.post(`${API_URL}/addToCart`, {
            accountID,    // Truyền accountID vào request body
            productID,    // Truyền productID vào request body
            quantity      // Truyền quantity vào request body
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Thêm giỏ hàng thành công:", response.data); 
        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error("Có lỗi khi thêm giỏ hàng:", error.response.data);
        } else {
            console.error("Có lỗi khi thêm giỏ hàng:", error);
        }
        throw error;
    }
},

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItemQuantity: async (accountID, productID, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/UpdateToCart`, {
        accountID,
        productID,
        quantity,
      },{
        headers: {
            'Content-Type': 'application/json',
        },
      });
      return response.data;
      } catch (error) {
        if (error.response) {
            console.error("Có lỗi cập nhật giỏ hàng:", error.response.data);
        } else {
            console.error("Có lỗi khi cập nhật giỏ hàng:", error);
        }
        throw error;
    }
  },

  removeFromCart: async (cartID,accountID) => {
    try {
      const response = await axios.delete(`${API_URL}/RemoveToCart?cartID=${cartID}&accountID=${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Có lỗi khi xóa sản phẩm khỏi giỏ hàng:", error.response.data);
      } else {
        console.error("Có lỗi khi xóa sản phẩm:", error);
      }
      throw error;
    }
  },
  
  

};

export default CartService;
