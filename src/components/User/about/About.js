import React from 'react';
import { Row, Col, Typography, Button } from 'antd';

import './About.css';
import chaugo from '../../../assets/banner-chau-go-trong-cay-min.jpg'; // Đường dẫn đến ảnh
import intro from '../../../assets/banner-hoakieng.jpg'; // Đường dẫn đến ảnh
import tantam from '../../../assets/tantam.jpg'; // Đường dẫn đến ảnh
import sptot from '../../../assets/sptot.png'; // Đường dẫn đến ảnh
import giatot from '../../../assets/giatot.jpg'; // Đường dẫn đến ảnh

import Service from './service';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="about-container">
      <Row justify="center" align="middle" className="about-section">
        {/* Hình ảnh minh họa */}
        <Col xs={24} md={10} className="about-image">
          <img
            src={chaugo}
            alt="Giới thiệu về chúng tôi"
            className="about-img"
            loading="lazy"
          />
        </Col>

        {/* Nội dung giới thiệu */}
        <Col xs={24} md={14} className="about-text">
          <Title level={2} className="about-title">
            Chào mừng đến với ShopHoaDTHU
          </Title>
          <Paragraph className="about-paragraph">
            Chúng tôi tự hào là đơn vị chuyên cung cấp <b>hoa tươi</b> và <b>hoa kiểng</b> chất lượng cao,
            đáp ứng mọi nhu cầu từ trang trí nhà cửa, quà tặng đến những dịp lễ trọng đại.
          </Paragraph>
          <Paragraph className="about-paragraph">
            Với sứ mệnh <b>mang thiên nhiên vào cuộc sống</b>, chúng tôi cam kết mang đến sản phẩm tốt nhất,
            giúp bạn truyền tải thông điệp yêu thương qua từng bông hoa.
          </Paragraph>
          <Button type="primary" size="large">
            Xem Sản Phẩm
          </Button>
        </Col>
      </Row>

      {/* Phần thông tin thêm */}
      <Row justify="center" className="about-info">
        <Col xs={24} md={8} className="info-item">
         <img src={sptot} alt="Giới thiệu về chúng tôi" className="img" loading="lazy"/>
          <Title level={4}>Sản phẩm chất lượng</Title>
          <Paragraph>Được chọn lọc kỹ lưỡng từ những nhà vườn uy tín.</Paragraph>
        </Col>
        <Col xs={24} md={8} className="info-item">
          <img src={giatot} alt="Giới thiệu về chúng tôi" className="img" loading="lazy"/>
          <Title level={4}>Giá cả hợp lý</Title>
          <Paragraph>Cam kết giá cạnh tranh đi đôi với chất lượng.</Paragraph>
        </Col>
        <Col xs={24} md={8} className="info-item">
          <img src={tantam} alt="Giới thiệu về chúng tôi" className="img" loading="lazy"/>
          <Title level={4}>Dịch vụ tận tâm</Title>
          <Paragraph>Đội ngũ nhân viên chuyên nghiệp, hỗ trợ tận tình.</Paragraph>
        </Col>
      </Row>
      <Row justify="center" align="middle" className="about-section">
        {/* Hình ảnh minh họa */}
        <Col xs={24} md={10} className="about-image">
          <img
            src={intro}
            alt="Giới thiệu về chúng tôi"
            className="about-img"
            loading="lazy"
          />
        </Col>

        {/* Nội dung giới thiệu */}
        <Col xs={24} md={14} className="about-text">
          <Title level={2} className="about-title">
            Dịch vụ của chúng tôi
          </Title>
          <Paragraph className="about-paragraph">
            Chúng tôi tự hào là đơn vị chuyên cung cấp <b>hoa tươi</b> và <b>hoa kiểng</b> chất lượng cao,
            đáp ứng mọi nhu cầu từ trang trí nhà cửa, quà tặng đến những dịp lễ trọng đại.
          </Paragraph>
          <Paragraph className="about-paragraph">
            Với sứ mệnh <b>mang thiên nhiên vào cuộc sống</b>, chúng tôi cam kết mang đến sản phẩm tốt nhất,
            giúp bạn truyền tải thông điệp yêu thương qua từng bông hoa.
          </Paragraph>
          <Button type="primary" size="large">
            Xem Sản Phẩm
          </Button>
        </Col>
      </Row>
      {/* Phần thông tin thêm */}
      <Service/>
    </div>
  );
};

export default About;
