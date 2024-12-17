import axios from 'axios';
const API_URL = 'http://localhost:5031/api/Account';

const AccountService = {
  // Lấy tài khoản theo accountID
  getAccountByAccountID: async (accountID) => {
    try {
      const response = await axios.get(`${API_URL}/getAccountbyID/${accountID}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      if (error.response) {
        console.error("Có lỗi khi lấy tài khoản:", error.response.data);
      } else {
        console.error("Có lỗi khi lấy tài khoản:", error);
      }
      throw error;
    }
  },
  // Lấy GetAllNoti
  GetAllNoti: async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllNoti`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    if (error.response) {
      console.error("Có lỗi khi lấy GetAllNoti:", error.response.data);
    } else {
      console.error("Có lỗi khi lấy GetAllNoti:", error);
    }
    throw error;
  }
},
// Lấy GetAllNoti
GetNotiByaccountID: async (accountID) => {
  try {
    const response = await axios.get(`${API_URL}/GetNotiByaccountID/${accountID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    if (error.response) {
      console.error("Có lỗi khi lấy GetAllNoti:", error.response.data);
    } else {
      console.error("Có lỗi khi lấy GetAllNoti:", error);
    }
    throw error;
  }
},
// Lấy GetAllNoti
GetAllNewpaper: async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllNewpaper`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    if (error.response) {
      console.error("Có lỗi khi lấy GetAllNewpaper:", error.response.data);
    } else {
      console.error("Có lỗi khi lấy GetAllNewpaper:", error);
    }
    throw error;
  }
},
  // đăng ký
  RegisterForm: async (values) => {
    try {
        // Gửi đối tượng JSON trong body của yêu cầu POST
        const response = await axios.post(`${API_URL}/Register`, values, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("Đăng ký tài khoản thành công:", response.data); 
        return response.data; 
    } catch (error) {
        if (error.response) {
            console.error("Có lỗi khi Đăng ký tài khoản:", error.response.data);
        } else {
            console.error("Có lỗi khi Đăng ký tài khoản:", error);
        }
        throw error;
    }
},

//   // Cập nhật số lượng sản phẩm trong giỏ hàng
//   updateCartItemQuantity: async (accountID, productID, quantity) => {
//     try {
//       const response = await axios.post(`${API_URL}/UpdateToCart`, {
//         accountID,
//         productID,
//         quantity,
//       },{
//         headers: {
//             'Content-Type': 'application/json',
//         },
//       });
//       return response.data;
//       } catch (error) {
//         if (error.response) {
//             console.error("Có lỗi cập nhật giỏ hàng:", error.response.data);
//         } else {
//             console.error("Có lỗi khi cập nhật giỏ hàng:", error);
//         }
//         throw error;
//     }
//   },

  
  

};

export default AccountService;
