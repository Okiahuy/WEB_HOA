import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/User/Home';
import Profile from '../pages/User/Profile';
import LoginForm from '../components/User/LoginForm';
import AboutUser from '../pages/User/AboutUser';
import NewUser from '../pages/User/NewSpaper';
import ProductDetail from '../components/User/ProductHomeUser/ProductDetail';
import CartUser from '../pages/User/CartUser';
import OrderUser from '../pages/User/OrderUser';
import FavoriteUser from '../pages/User/FavoriteUser';
import PaymentPage from '../components/User/cartUser/PaymentPage';
import ProductHome from '../pages/User/Product';
import OrderDetail from '../components/User/orderUser/OrderDetail';
import Notification from '../components/User/newpaper/Notification';
import RegisterForm from '../components/User/UserLayoutComponent/RegisterForm';


const UserRoutes = () => {
  return (
    <Routes>
        {/* trang chủ */}
        <Route path="/home" element={<Home />} />
        {/* Sản phẩm */}
        <Route path="/product" element={<ProductHome />} />
        {/* thông tin */}
        <Route path="/profile" element={<Profile />} />
         {/* đăng nhập */}
        <Route path="/login" element={<LoginForm />} />
         {/* đăng ký */}
         <Route path="/register" element={<RegisterForm />} />
         {/* giới thiệu */}
        <Route path="/about" element={<AboutUser />} />
        {/* tin tức */}
        <Route path="/new" element={<NewUser />} />
        {/* giỏ hàng */}
        <Route path="/cart" element={<CartUser />} />
        {/* yêu thích */}
        <Route path="/favorite" element={<FavoriteUser />} />
        {/* tin nhắn */}
        <Route path="/notification" element={<Notification />} />
        {/*thanh toán momo*/}
        <Route path="/payment" element={<PaymentPage />} />
        {/*đơn hàng*/}
        <Route path="/order" element={<OrderUser />} />
         {/* chi tiết sản phẩm */}
        <Route path="/product/:id" element={<ProductDetail />} />
         {/* chi tiết sản phẩm */}
         <Route path="/orderDetail/:id" element={<OrderDetail />} />
         {/*trang chủ mặc định */}
        <Route path="/*" element={<Home />} />
      </Routes>
  );
};
export default UserRoutes;
