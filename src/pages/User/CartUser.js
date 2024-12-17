import React from 'react';
import Cart from '../../components/User/cartUser/Cart';
import Service from '../../components/User/about/service';


const CartUser = () => {
  return (
    <div>

      {/* giỏ hàng của tui */}
      <Cart/>
     
      {/* dịch vụ */}
      <Service/>
    </div>
  );
  };
  
  export default CartUser; // Export mặc định