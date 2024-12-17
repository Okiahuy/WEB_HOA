import React from 'react';
import { Row, Col, Typography } from 'antd';

import './About.css';
import freeship from '../../../assets/freesip.png'; // Đường dẫn đến ảnh
import flash from '../../../assets/flash.png'; // Đường dẫn đến ảnh
import shipcod from '../../../assets/shipcod.png'; // Đường dẫn đến ảnh
import doitra from '../../../assets/doitramienphi1-7199.jpg'; // Đường dẫn đến ảnh

const { Title, Paragraph } = Typography;

const Service = () => {
  return (
    <div className="about-container">
      {/* Phần thông tin thêm */}
      <Row justify="center" className="about-info">
        <Col xs={24} md={6} className="info-item">
          <img src={flash} alt="Giao hàng nhanh chóng" className="info-icon" loading="lazy"/>
          <Title level={4}>Giao hàng nhanh chóng</Title>
          <Paragraph>Đảm bảo hoa tươi được giao đến tay bạn trong thời gian ngắn nhất.</Paragraph>
        </Col>
        <Col xs={24} md={6} className="info-item">
          <img src={freeship} alt="Miễn phí lần đầu" className="info-icon" loading="lazy"/>
          <Title level={4}>Miễn phí ship lần đầu cho khách hàng mới!</Title>
          <Paragraph>Khách hàng mới sẽ được miễn phí giao hàng cho đơn đầu tiên.</Paragraph>
        </Col>
        <Col xs={24} md={6} className="info-item">
          <img src={shipcod} alt="Kiểm tra trước khi thanh toán" className="info-icon" loading="lazy"/>
          <Title level={4}>Kiểm tra trước khi thanh toán</Title>
          <Paragraph>Bạn hoàn toàn có thể kiểm tra sản phẩm trước khi thanh toán.</Paragraph>
        </Col>
        <Col xs={24} md={6} className="info-item">
          <img src={doitra} alt="Miễn phí đổi trả" className="info-icon" loading="lazy"/>
          <Title level={4}>Miễn phí đổi trả trong vòng 7 ngày</Title>
          <Paragraph>Đổi trả miễn phí nếu sản phẩm không đúng yêu cầu hoặc bị hư hỏng.</Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default Service;
