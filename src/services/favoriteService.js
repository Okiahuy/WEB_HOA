import axios from 'axios';
const API_URL = 'http://localhost:5031/api/favorite';

const FavoriteService = {
  // Lấy sản phẩm yêu thích theo accountID
  getFavoriteByAccountID: async (accountID) => {
    try {
      const response = await axios.get(`${API_URL}/favorites?accountID=${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      if (error.response) {
        console.error("Có lỗi khi lấy sản phẩm yêu thích:", error.response.data);
      } else {
        console.error("Có lỗi khi lấy sản phẩm yêu thích:", error);
      }
      throw error;
    }
  },
  //kiểm tra sản phẩm yêu thích
  checkIsFavorite: async (accountID, productID) => {
    try {
        const response = await axios.get(`${API_URL}/isFavorite?accountID=${accountID}&productID=${productID}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data && response.data.isFavorite !== undefined) {
            return response.data.isFavorite;
        }

        return false; // Mặc định nếu không có dữ liệu
    } catch (error) {
        console.error("Lỗi khi kiểm tra trạng thái yêu thích:", error);
        return false;
    }
},
  // Yêu thích sản phẩm
  ToggleFavorite: async (accountID, productID) => {
    try {
        // Gửi đối tượng JSON trong body của yêu cầu POST
        const response = await axios.post(`${API_URL}/toggle?accountID=${accountID}&productID=${productID}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Yêu thích sản phẩm thành công:", response.data); 
        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error("Có lỗi khi Yêu thích sản phẩm:", error.response.data);
        } else {
            console.error("Có lỗi khi Yêu thích sản phẩm:", error);
        }
        throw error;
    }
},

  

};

export default FavoriteService;
