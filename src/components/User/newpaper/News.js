import React from 'react';
import { Card, Col, Row } from 'antd';

const News = () => {
  const newsData = [
    {
      title: 'Làm thế nào để chăm sóc Hoa Hồng lâu tàn?',
      content: 'Chăm sóc hoa hồng đúng cách giúp hoa tươi lâu và nở đẹp...',
      image: 'https://cayxanhmientrung.com/wp-content/uploads/2023/02/hoa-kieng5.jpg',
    },
    {
      title: 'Các loại hoa kiểng đẹp cho không gian nhà bạn',
      content: 'Hoa kiểng không chỉ trang trí mà còn giúp làm sạch không khí...',
      image: 'https://danviet.mediacdn.vn/296231569849192448/2022/5/9/cay-canh-hoa-muoi-gio-2-16520870927432029740879.jpg',
    },
    {
      title: 'Làm thế nào để chăm sóc Hoa Hồng lâu tàn?',
      content: 'Chăm sóc hoa hồng đúng cách giúp hoa tươi lâu và nở đẹp...',
      image: 'https://cayxanhmientrung.com/wp-content/uploads/2023/02/hoa-kieng5.jpg',
    },

  ];

  return (
    <div>
      <h2>Tin Tức Về Hoa Tươi & Hoa Kiểng</h2>
      <Row gutter={16}>
        {newsData.map((item, index) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              cover={<img alt={item.title} src={item.image} />}
            >
              <Card.Meta title={item.title} description={item.content} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
