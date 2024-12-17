import React from 'react';
import { Carousel, Button } from 'antd';
import './Banner.css';

import hoatuoi from '../../../assets/banner-hoatuoi.png'; // Đường dẫn đến ảnh
import hoakieng from '../../../assets/banner-hoakieng.jpg'; // Đường dẫn đến ảnh
import intro from '../../../assets/banner-intro.jpg'; // Đường dẫn đến ảnh
import chaugo from '../../../assets/banner-chau-go-trong-cay-min.jpg'; // Đường dẫn đến ảnh

const Banner = () => {
  const contentStyle = {
    height: '400px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <Carousel autoplay>
      <div>
        <div className="banner-slide" style={contentStyle}>
          <img
            src={intro}
            alt="Hoa tươi đẹp"
            className="banner-image"
            loading="lazy"
          />
          <div className="banner-text">
            <h1>Chào mừng đến với Shop Hoa của chúng tôi</h1>
            <p>Những bông hoa tươi thắm, dành tặng yêu thương</p>
            <Button type="primary" size="large">Khám phá ngay</Button>
          </div>
        </div>
      </div>
      <div>
        <div className="banner-slide" style={contentStyle}>
          <img
            src={hoatuoi}
            alt="Hoa tươi đẹp"
            className="banner-image"
            loading="lazy"
          />
          <div className="banner-text">
            <p>Những loại hoa kiểng đầy đủ màu sắc</p>
           
          </div>
        </div>
      </div>
      <div>
        <div className="banner-slide" style={contentStyle}>
          <img
            src={hoakieng}
            alt="Hoa Kiểng Đủ Loại"
            className="banner-image"
            loading="lazy"
          />
          <div className="banner-text">
            <h1>Hoa Kiểng - Tình Yêu & Cuộc Sống</h1>
            <p>Đặt ngay hôm nay để nhận ưu đãi đặc biệt</p>
           
          </div>
        </div>
      </div>
      <div>
        <div className="banner-slide" style={contentStyle}>
          <img
            src={chaugo}
            alt="Chậu Kiểng Đủ Loại"
            className="banner-image"
            loading="lazy"
          />
          <div className="banner-text">
            <h1>Ngoài ra còn có các loại chậu hoa</h1>
            <p>Đặt ngay hôm nay để nhận ưu đãi đặc biệt</p>
            <Button type="primary" size="large">Khám phá ngay</Button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
