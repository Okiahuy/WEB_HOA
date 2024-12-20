import React from 'react';
import ProductHomeUserComponent from '../../components/User/ProductHomeUser/ProductHomeUserComponent'
import ProductHomeUserComponentKieng from '../../components/User/ProductHomeUser/ProductHomeUserComponentKieng';
import ProductHomeUserComponentDocla from '../../components/User/ProductHomeUser/ProductHomeUserComponentDocla';
import Banner from '../../components/User/banner/Banner';
import News from '../../components/User/newpaper/News';


const Home = () => {
  return (
    <div>
      {/* banner  */}
      <Banner />

      <h1>Hoa Kiểng Mới Nhất</h1>
      {/* sp chính về hoa kiểng*/}
      <ProductHomeUserComponentKieng/>

      <h1>Hoa Tươi Mới Nhất</h1>
      {/* sp chính về hoa tươi*/}
      <ProductHomeUserComponent/>

      <h1>Hoa Kiểng Độc Lạ Việt Nam</h1>
      {/* sp chính về hoa kiểng Độc lạ*/}
      <ProductHomeUserComponentDocla/>

      <News/>
      
    </div>
    
  );
};
  export default Home; // Export mặc định