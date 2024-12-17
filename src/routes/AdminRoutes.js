import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import ManageUsers from '../pages/Admin/ManageUsers';
import AdminProductList from '../pages/Admin/AdminProductList'; 
import AdminProductListdungcu from '../pages/Admin/AdminProductList-dungcu';
import CategoryAdmin from '../pages/Admin/CategoryAdmin';
import SupplierAdmin from '../pages/Admin/SupplierAdmin';
import HealthCheck from '../components/Admin/HealthCheck/HealthCheck';
import OrderList from '../components/Admin/OrderAdmin/OrderList';
import OrderPrintPage from '../components/Admin/OrderAdmin/OrderPrintPage';
import TypeAdmin from '../pages/Admin/TypeAdmin';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<ManageUsers />} />
      <Route path="supplier" element={<SupplierAdmin />} />
      <Route path="productlist-hoa" element={<AdminProductList />} />
      <Route path="productlist-dungcu" element={<AdminProductListdungcu />} />
      <Route path="healthcheck-product" element={<HealthCheck />} />
      <Route path="order" element={<OrderList />} />
      <Route path="/order-print/:id" element={<OrderPrintPage />} />
      <Route path="category" element={<CategoryAdmin />} />
      <Route path="type" element={<TypeAdmin />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
