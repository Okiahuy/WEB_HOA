// src/services/CustomerService.js
const API_URL = 'http://localhost:5031/api/Account'; 

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
    const Token = user.token; 
    console.log('Token:', Token); 
} else {
    console.log('Không có người dùng đăng nhập.');
}

export const fetchCustomer = async () => {
    const response = await fetch(`${API_URL}/getAccountByRole`,{
        method: 'GET',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
                },
    });

    const data = await response.json();
    return data.data; 
};

// export const addCustomer = async (Customers) => {
//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//              'Content-Type': 'application/json',
//               'Authorization': `Bearer ${user.token}`
//              },
//         body: JSON.stringify(Customers),
//     });
//     return response.ok;
// };

// export const updateCustomer = async (id, Customers) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//         method: 'PUT',
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${user.token}` },
//         body: JSON.stringify(Customers),
//     });
//     return response.ok;
// };

// export const deleteCustomer = async (id) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE',
//         headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${user.token}` },
//     });

//     if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Lỗi khi xóa nhà cung cấp:', errorData.message); // Log the custom error message
//         throw new Error(errorData.message); // Re-throw the error to handle it outside
//     }
//     return response.ok;
// };

// export const searchCustomers = async (name) => {
//     const response = await fetch(`${API_URL}/search?name=${name}`);
//     const data = await response.json();
//     return data.data;
// };


