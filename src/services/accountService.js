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
GetAnswersByProductId: async (productID) => {
  try {
    const response = await axios.get(`${API_URL}/answers/${productID}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    if (error.response) {
      console.error("Có lỗi khi lấy GetAnswersByProductId:", error.response.data);
    } else {
      console.error("Có lỗi khi lấy GetAnswersByProductId:", error);
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
addAnswer: async (answer) => {
  try {
    const response = await axios.post(`${API_URL}/add-answer`, answer, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data; 
} catch (error) {
  if (error.response) {
      console.error("Có lỗi khi bình luận:", error.response.data);
  } else {
      console.error("Có lỗi khi bình luận:", error);
  }
  throw error;
}

},
updateUser: async (accountID, account) => {
  try {
    const response = await axios.put(`${API_URL}/updateUser/${accountID}`, account, {
        headers: { 
            'Content-Type': 'multipart/form-data', 
         },
    });
    console.log("Sửa thành công:", response.data); 
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    if (error.response) {
      console.error("Có lỗi khi lấy updateUser:", error.response.data);
    } else {
      console.error("Có lỗi khi lấy updateUser:", error);
    }
    throw error;
  } 
},

};

export default AccountService;
