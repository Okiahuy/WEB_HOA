import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Spin, Alert } from 'antd';
import { ShoppingCartOutlined, UserOutlined, HeartOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart,Line} from 'recharts';
import statisticService from '../../services/statisticService';
// Dữ liệu mẫu cho biểu đồ npm install recharts

const data = [
  { date: '2024-10-15', products: 120, customers: 200, favorites: 350 },
  { date: '2024-10-16', products: 130, customers: 220, favorites: 330 },
  { date: '2024-10-17', products: 140, customers: 180, favorites: 370 },
  { date: '2024-10-18', products: 150, customers: 250, favorites: 360 },
  { date: '2024-10-19', products: 160, customers: 230, favorites: 380 },
];

const Dashboard = () => {
  const [productCount, setProducts] = useState([]);
  const [favoriteCount, setfavoriteCounts] = useState([]);
  const [totalUsers, settotalUsers] = useState([]);
  const [totalPrice, settotalPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await statisticService.statistics();
        console.log(response);  // Log toàn bộ phản hồi API
        const data = response;
        
        // Log cụ thể dữ liệu trả về từ API
        console.log('Dữ liệu trả về từ API:', data);
  
        if (data) {
          // Kiểm tra từng thuộc tính
          console.log('totalProducts:', data.totalProducts);
          console.log('totalLikes:', data.totalLikes);
          console.log('totalUsers:', data.totalUsers);
          console.log('totalPrice:', data.totalPrice);
  
          // Gán giá trị vào state nếu tất cả đều hợp lệ
          if (typeof data.totalProducts === 'number' && 
              typeof data.totalLikes === 'number' &&
              typeof data.totalUsers === 'number' &&
              typeof data.totalPrice === 'number') {
            setProducts(data.totalProducts);
            setfavoriteCounts(data.totalLikes);
            settotalUsers(data.totalUsers);
            settotalPrices(data.totalPrice);
          } else {
            throw new Error('Dữ liệu không hợp lệ - Một số thuộc tính không đúng định dạng');
          }
        } else {
          throw new Error('Dữ liệu không hợp lệ');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStatistics();
  }, []);
  
  
  
  


  if (loading) {
    return (
      <Spin spinning={true} tip="Đang tải...">
        <div>Đang tải sản phẩm...</div>
      </Spin>
    )
  }

  if (error) {
    return <Alert message="Lỗi" description={error} type="error" showIcon />;
  }
  return (
    <div style={{ padding: '24px' }}>
      <h2>TRANG CHỦ</h2>
      <Row gutter={[16, 16]}>
      {/* Thống kê số lượng sản phẩm */}
      <Col span={6}>
        <Card style={{ backgroundColor: '#f0f2f5', borderColor: '#1890ff' }}>
          <Statistic
            title="Sản phẩm"
            value={productCount || 0}
            prefix={<ShoppingCartOutlined />}
          />
        </Card>
      </Col>

      {/* Thống kê số lượng khách hàng */}
      <Col span={6}>
        <Card style={{ backgroundColor: '#fff7e6', borderColor: '#faad14' }}>
          <Statistic
            title="Khách hàng"
            value={totalUsers || 0}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>

      {/* Thống kê số lượt yêu thích */}
      <Col span={6}>
        <Card style={{ backgroundColor: '#e6ffed', borderColor: '#52c41a' }}>
          <Statistic
            title="Lượt yêu thích"
            value={favoriteCount || 0}
            prefix={<HeartOutlined />}
          />
        </Card>
      </Col>

      {/* Thống kê tổng doanh thu */}
      <Col span={6}>
        <Card style={{ backgroundColor: '#fff1f0', borderColor: '#ff4d4f' }}>
          <Statistic
            title="Doanh thu"
            value={totalPrice || 0}
            prefix={<MoneyCollectOutlined />}
          />
        </Card>
      </Col>
    </Row>


    

      <h2 style={{ marginTop: '24px' }}>Thống kê doanh thu</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="products" fill="#1890ff" name="Sản phẩm" />
          <Line dataKey="customers" fill="#faad14" name="Khách hàng" />
          <Line dataKey="favorites" fill="#52c41a" name="Lượt yêu thích" />
        </LineChart>
      </ResponsiveContainer>
      

  {/* Biểu đồ thống kê
  <h2 style={{ marginTop: '24px' }}>Thống kê theo ngày</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="products" fill="#1890ff" name="Sản phẩm" />
          <Bar dataKey="customers" fill="#faad14" name="Khách hàng" />
          <Bar dataKey="favorites" fill="#52c41a" name="Lượt yêu thích" />
        </BarChart>
      </ResponsiveContainer>
 */}


    </div>
  );
};

export default Dashboard;
