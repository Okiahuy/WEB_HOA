// src/services/categoryService.js
const API_URL = 'http://localhost:5031/api/category'; 

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    const Token = user.token; 
    console.log('Token:', Token); 
} else {
    console.log('Không có người dùng đăng nhập.');
   
}

export const fetchCategories = async () => {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                 },
    });
    const data = await response.json();
    return data.data; 
};

export const addCategory = async (formData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
             
              'Authorization': `Bearer ${user.token}`,
             },
        body: formData, // Không cần JSON.stringify
    });
    return response.ok;
};

export const updateCategory = async (id, formData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${user.token}`,
         },
         body: formData, // Không cần JSON.stringify
    });
    return response.ok;
};

export const deleteCategory = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Lỗi khi xóa danh mục:', errorData.message); // Log the custom error message
        throw new Error(errorData.message); // Re-throw the error to handle it outside
    }

    return response.ok;
};

export const searchCategories = async (name) => {
    const response = await fetch(`${API_URL}/search?name=${name}`);
    const data = await response.json();
    return data.data;
};
