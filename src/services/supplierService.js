// src/services/SupplierService.js
const API_URL = 'http://localhost:5031/api/Supplier'; 

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    const Token = user.token; 
    console.log('Token:', Token); 
} else {
    console.log('Không có người dùng đăng nhập.');
}

export const fetchSupplier = async () => {
    const response = await fetch(API_URL,{
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                },
    });

    const data = await response.json();
    return data.data; 
};

export const addSupplier = async (suppliers) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
             },
        body: JSON.stringify(suppliers),
    });
    return response.ok;
};

export const updateSupplier = async (id, suppliers) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` },
        body: JSON.stringify(suppliers),
    });
    return response.ok;
};

export const deleteSupplier = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}` },
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Lỗi khi xóa nhà cung cấp:', errorData.message); // Log the custom error message
        throw new Error(errorData.message); // Re-throw the error to handle it outside
    }
    return response.ok;
};

export const searchSuppliers = async (name) => {
    const response = await fetch(`${API_URL}/search?name=${name}`);
    const data = await response.json();
    return data.data;
};
