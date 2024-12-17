import { Alert} from 'antd';
import axios from 'axios'
// Địa chỉ API npm install axios 
const API_URL = 'http://localhost:5031/api/product';
const API_URL_CATE = 'http://localhost:5031/api/category';

const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

if (user) {
    const Token = user.token; // Lấy Token
    console.log('Token:', Token); // In ra Token để kiểm tra
   
} else {
   
    console.log('Không có người dùng đăng nhập.');
}

const productService = {
  AddProducts: async (formData) => {
    try {
        const response = await axios.post(`${API_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
                Authorization: `Bearer ${user.token}`, 
            },
        });
        console.log("Thêm sản phẩm thành công:", response.data); 
        return response.data; 
    } catch (error) {
        if (error.response) {
          console.error("Có lỗi khi thêm sản phẩm:", error.response.data);
        } else {
            console.error("Có lỗi khi thêm sản phẩm:", error);
        }
        throw error;
    }
},

  //dành cho người quản trị
  getProductsByType: async (typeProduct, page, pageSize) => {
    try {
      const response = await axios.get(`${API_URL}/GetProductsByType`, {
        params: { typeProduct, page, pageSize }, // Thêm các tham số phân trang
        headers: {
          Authorization: `Bearer ${user.token}`, // Truyền token vào header
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error);
      throw error; 
    }
  },

  //dành cho người dùng
  getCategoriesForUser: async () => {
    try {
      const response = await axios.get(`${API_URL_CATE}/GetCategories`, {
        headers: {
          'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách dannh mục:', error);
      throw error; 
    }
  },
  // Dành cho người dùng
  getProductsForUser: async (typeProduct,sl) => {
    try {
        const response = await axios.get(`${API_URL}/GetProductByTypeForUser/${typeProduct}&${sl}`, {
            headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
            }
        });
        return response.data; 
    } catch (error)  {
        console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error.message);
        // Kiểm tra và in ra thông báo lỗi
        if (error.response) {
            Alert(error.response.data.message); // In ra thông báo lỗi từ API
        } else {
            Alert("Có lỗi xảy ra:", error.message);
        }
        // Ném lại lỗi để xử lý bên ngoài nếu cần
        throw error; 
    }
  },
  // Dành cho người dùng
  getProductsForCategoryID: async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/getProductByCategoryID/${categoryId}`, {
            headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
            }
        });
        console.log(response.data);
        return response.data;
        
    } catch (error)  {
        console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error.message);
        // Kiểm tra và in ra thông báo lỗi
        if (error.response) {
            Alert(error.response.data.message); // In ra thông báo lỗi từ API
        } else {
            Alert("Có lỗi xảy ra:", error.message);
        }
        // Ném lại lỗi để xử lý bên ngoài nếu cần
        throw error; 
    }
  },
  // Dành cho người dùng Search
  SearchProducts: async (name) => {
    try {
        const response = await axios.get(`${API_URL}/search/${name}`, {
            headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
            }
        });
        return response.data.data;
    } catch (error)  {
        console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error.message);
        // Kiểm tra và in ra thông báo lỗi
        if (error.response) {
            Alert(error.response.data.message); // In ra thông báo lỗi từ API
        } else {
            Alert("Có lỗi xảy ra:", error.message);
        }
        // Ném lại lỗi để xử lý bên ngoài nếu cần
        throw error; 
    }
  },
  // Dành cho người dùng getProductByCategoryAndSort
getProductsByCategoryAndSort: async (categoryId, minPrice, maxPrice, sortBy) => {
  try {
      const response = await axios.get(`${API_URL}/getProductsByCategoryAndSort`, {
        params: {
          categoryId,
          minPrice,
          maxPrice,
          sortBy, // Thêm tham số sortBy vào request
        },
        headers: {
            'Content-Type': 'application/json', // Optional, thường không cần thiết cho yêu cầu GET
        }
      });
      return response.data; // Trả về sản phẩm nếu tìm thấy
      
  } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error.message);
      // Hiển thị thông báo lỗi từ API nếu có
      if (error.response) {
          Alert(error.response.data.message); // Thông báo lỗi từ API
      } else {
          Alert("Có lỗi xảy ra:", error.message); // Thông báo lỗi chung
      }
      // Ném lại lỗi để có thể xử lý tiếp nếu cần
      throw error; 
  }
},

  // // Dành cho người dùng getProductByCategoryAndPrice
  // filterProductsByPrice: async (categoryId, minPrice, maxPrice) => {
  //   try {
  //       const response = await axios.get(`${API_URL}/getProductsByCategoryAndSort`, {
  //         params: {
  //           categoryId,
  //           minPrice,
  //           maxPrice,
  //         },
  //           headers: {
  //               'Content-Type': 'application/json', // Optional, usually not required for GET requests
  //           }
  //       });
  //       return response.data; // Return the products if found
  //   } catch (error)  {
  //       console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error.message);
  //       // Display error message from the API if available
  //       if (error.response) {
  //           Alert(error.response.data.message); 
  //       } else {
  //           Alert("Có lỗi xảy ra:", error.message);
  //       }
  //       // Rethrow the error to allow further handling if necessary
  //       throw error; 
  //   }
  // },


  // Dành cho người dùng 
  getProductsForUserKieng: async (categoryId,sl) => {
    try {
        const response = await axios.get(`${API_URL}/getProductByCategoryIDandQuantity/${categoryId}&${sl}`, {
            headers: {
                'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
            }
        });
        return response.data; 
    } catch (error)  {
        console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error.message);
        // Kiểm tra và in ra thông báo lỗi
        if (error.response) {
            Alert(error.response.data.message); // In ra thông báo lỗi từ API
        } else {
            Alert("Có lỗi xảy ra:", error.message);
        }
        // Ném lại lỗi để xử lý bên ngoài nếu cần
        throw error; 
    }
  },

  updateProduct: async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data', 
                Authorization: `Bearer ${user.token}`, // Add token to header
            },
        });
        return response.data; // Return updated data or a message
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật sản phẩm:', error);
        throw error; // Throw the error for handling outside this function
    }
},

  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          'Content-Type': 'application/json', // Kiểm tra nếu cần thiết
      }
      });
      console.log(`lấy sản phẩm với ID ${id}`);
      return response.data; // Trả về dữ liệu sản phẩm theo ID
    } catch (error) {
      console.error(`Có lỗi xảy ra khi lấy sản phẩm với ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  },
  DeleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`, // Truyền token vào header
      }
      });
      console.log(`Xóa sản phẩm với ID ${id}`);
      return response.data; // Trả về dữ liệu sản phẩm theo ID
    } catch (error) {
      console.error(`Có lỗi xảy ra khi xóa sản phẩm với ID ${id}:`, error);
      throw error; // Ném lại lỗi để xử lý bên ngoài
    }
  },
};

export default productService;
