import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Link } from 'react-router-dom';
import './slider.css';

import yeuthich from '../../../assets/yeuthich.png'; // Đường dẫn đến ảnh
import myorder from '../../../assets/myorder.jpg'; // Đường dẫn đến ảnh
import tinnnhan from '../../../assets/tinnnhan.jpg'; // Đường dẫn đến ảnh
import thongtin from '../../../assets/thongtin.jpg'; // Đường dẫn đến ảnh

const { Title} = Typography;


const SliderbarUser = () => {
    return (
        <div className="Slider-container">
        {/* Phần thông tin thêm */}
        <Row justify="center" className="Slider-info">
          <Col xs={24} md={6} className="Slider-info-item">
            <Link to="/order">
              <img src={myorder} alt="Đơn hàng" className="Slider-info-icon" loading="lazy"/>
              <Title level={4} className="Slider-info-item">Đơn hàng</Title>
            </Link>
          </Col>
          <Col xs={24} md={6} className="Slider-info-item">
            <Link to="/favorite">
              <img src={yeuthich} alt="Yêu thích" className="Slider-info-icon" loading="lazy"/>
              <Title level={4} className="Slider-info-item">Yêu thích</Title>
            </Link>
          </Col>
          <Col xs={24} md={6} className="Slider-info-item">
            <Link to="/notification">
              <img src={tinnnhan} alt="Tinn nhắn" className="Slider-info-icon" loading="lazy"/>
              <Title level={4} className="Slider-info-item">Tin nhắn</Title>
            </Link>
          </Col>
          <Col xs={24} md={6} className="Slider-info-item">
            <Link to="/infoweb">
              <img src={thongtin} alt="Thông tin về web" className="Slider-info-icon" loading="lazy"/>
              <Title level={4} className="Slider-info-item">Thông tin về web</Title>
            </Link>
          </Col>
        </Row>
      </div>
    );
    
  };
  
  export default SliderbarUser; // Export mặc định
  