import React from 'react';
import { Layout, Typography, Row, Col, Card, Space, Divider } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const products = [
  {
    title: 'Hoa Mai',
    description: 'Hoa mai vàng – biểu tượng của sự phú quý và may mắn.',
    img: 'https://i0.wp.com/phanbonnongnghiepviet.com/wp-content/uploads/2023/12/z5017792528308_38ec63c040ec3eb2ffa6f6a9ef28d8e0-1.jpg?fit=800%2C534&ssl=1',
  },
  {
    title: 'Hoa Đào',
    description: 'Hoa đào – loài hoa gắn liền với Tết và sự đoàn viên.',
    img: 'https://cuahanghoa.vn/wp-content/uploads/2020/10/cay-hoa-dao-1.jpg',
  },
  {
    title: 'Hoa Hồng',
    description: 'Hoa hồng – biểu tượng của tình yêu và sự lãng mạn.',
    img: 'https://file.hstatic.net/200000455999/article/y_nghia_hoa_hong_a3efe1fd01cc435a8c85d1ddfd71748f.png',
  },
  {
    title: 'Dụng Cụ Làm Vườn',
    description: 'Len chậu, xẻng, kéo cắt tỉa – tất cả những gì bạn cần để chăm sóc khu vườn.',
    img: 'https://nongcutiendam.vn/wp-content/uploads/2020/01/bo-ba-dung-cu-lam-vuon.jpg',
  },
];

const Infoweb = () => {
  return (
    <Layout style={{ background: '#fff' }}>
      <Content style={{ padding: '50px 100px' }}>
        <Title level={1} style={{ textAlign: 'center' }}>SHOP HOA - DTHU</Title>
        <Paragraph style={{ textAlign: 'center', fontSize: '16px' }}>
          Chào mừng bạn đến với Shop Hoa - DTHU, nơi cung cấp các sản phẩm hoa tươi và dụng cụ làm vườn hàng đầu! Chúng tôi tự hào mang đến cho bạn sự lựa chọn đa dạng, từ những loại hoa truyền thống đến các vật dụng chăm sóc cây cối.
        </Paragraph>

        <Divider />

        <Title level={2}>Về Chúng Tôi</Title>
        <Paragraph>
          Shop Hoa - DTHU được thành lập với sứ mệnh mang lại sắc màu tươi mới và hương thơm ngọt ngào từ thiên nhiên vào cuộc sống của bạn. Chúng tôi chuyên cung cấp các loại hoa kiểng như hoa mai, hoa đào, và hoa tươi như hoa hồng, hoa cúc, hoa lan. Bên cạnh đó, chúng tôi còn cung cấp các dụng cụ làm vườn như len chậu, xẻng, kéo tỉa để giúp bạn dễ dàng chăm sóc khu vườn của mình.
        </Paragraph>
        <Paragraph>
          Với đội ngũ nhân viên tận tâm và kinh nghiệm, chúng tôi cam kết mang đến cho bạn những sản phẩm và dịch vụ chất lượng nhất.
        </Paragraph>

        <Divider />

        <Title level={2}>Sản Phẩm Nổi Bật</Title>
        <Row gutter={[16, 16]}>
          {products.map((product, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                cover={<img alt={product.title} src={product.img} />}
              >
                <Card.Meta title={product.title} description={product.description} />
              </Card>
            </Col>
          ))}
        </Row>

        <Divider />

        <Title level={2}>Liên Hệ</Title>
        <Space direction="vertical" size="middle">
          <Paragraph>
            Địa chỉ: 123 Đường Hoa Mai, PHƯỜNG 6, Thành Phố Cao Lãnh
          </Paragraph>
          <Paragraph>
            Số điện thoại: 0123 456 789
          </Paragraph>
          <Paragraph>
            Email: cucungflowers@example.com
          </Paragraph>
        </Space>
      </Content>
    </Layout>
  );
};

export default Infoweb;
