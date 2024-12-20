import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Spin, Alert, Table } from 'antd';
import {  HeartFilled,DollarOutlined,UserOutlined } from '@ant-design/icons';
import {  ResponsiveContainer } from 'recharts';
import statisticService from '../../services/statisticService';
// Dữ liệu mẫu cho biểu đồ npm install recharts

const Dashboard = () => {
  const [productCount, setProducts] = useState([]);
  const [favoriteCount, setfavoriteCounts] = useState([]);
  const [totalUsers, settotalUsers] = useState([]);
  const [totalPrice, settotalPrices] = useState([]);
  const [totalAccess, settotalAccess] = useState([]);
  const [requestTime, setrequestTimes] = useState([]);
  const [mid, setmids] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const response = await statisticService.statistics();
        console.log(response);  // Log toàn bộ phản hồi API
        const data = response;
        if (data) {
         
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

  useEffect(() => {
    const fetchMiddlewares = async () => {
      setLoading(true);
      try {
        const response = await statisticService.Middleware();
        console.log(response);  // Log toàn bộ phản hồi API
        const data = response;
        if (data) {
          // Gán giá trị vào state nếu tất cả đều hợp lệ
          setmids(response.data);
          if (
              typeof data.totalAccess === 'number') {
                settotalAccess(data.totalAccess);
                setrequestTimes(data.requestTime);
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
  
    fetchMiddlewares();
  }, []);
  
  
  const columns = [
    { title: 'STT', dataIndex: 'id', key: 'id' },
    { title: 'Tên api', dataIndex: 'apiName', key: 'apiName' },
    { title: 'Lượt truy cập', dataIndex: 'requestCount', key: 'requestCount' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'CPU', dataIndex: 'cpuUsage', key: 'cpuUsage' },
    { title: 'Thời gian(ms)', dataIndex: 'requestTime', key: 'requestTime' },
];


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
        <Card style={{ backgroundColor: '#2c3e50', borderColor: '#1890ff' , color: 'white', fontSize:'20px' }}>
          <p>Tổng sản phẩm</p>
          <p>{productCount} 🌸</p>
        </Card>
      </Col>

      {/* Thống kê số lượng khách hàng */}
      <Col span={6}>
        <Card style={{ backgroundColor: '#2c3e50', borderColor: '#faad14', color: 'white', fontSize:'20px'  }}>
          <p>Tổng khách hàng</p>
          <p>{totalUsers} <UserOutlined style={{ color: 'red' }}/></p>
        </Card>
      </Col>

      {/* Thống kê số lượt yêu thích */}
      <Col span={6}>
        <Card style={{ backgroundColor: '#2c3e50', borderColor: '#52c41a', color: 'white', fontSize:'20px'  }}>
          <p>Tổng lượt thích</p>
          <p>{favoriteCount } <HeartFilled style={{ color: 'red' }} /> </p>
        </Card>
      </Col>

      {/* Thống kê tổng doanh thu */}
      <Col span={6}>
        <Card style={{ backgroundColor: '#2c3e50', borderColor: '#ff4d4f', color: 'white', fontSize:'20px'  }}>
          <p>Tổng doanh thu</p>
          <p>{totalPrice.toLocaleString()} <DollarOutlined style={{ color: 'yellow' }} /> </p>
        </Card>
      </Col>
    </Row>

    
    <Row gutter={[16, 16]}>
      <Col span={10}>
        <h2 style={{ marginTop: '24px' }}>Các Request</h2>
        <ResponsiveContainer width="100%" height={300}>
          <Table dataSource={mid} rowKey="id" columns={columns}  pagination={false} scroll={{ y: 300 }} bordered/>
        </ResponsiveContainer>
      </Col>

      <Col span={7} >
        <h2 style={{ marginTop: '24px' }}>Tổng lượt truy cập web site</h2>
        <ResponsiveContainer width="100%" height={300}>
          <Card style={{ backgroundColor: '#2c3e50', borderColor: 'white', width:'300px',  height:'300px', color: 'white', fontSize:'25px',borderRadius:'50%',textAlign:'center',alignContent:'center' }}>
            <p>{totalAccess.toLocaleString()} lượt</p>
          </Card>
        </ResponsiveContainer>
      </Col>
      <Col span={7}>
        <h2 style={{ marginTop: '24px' }}>Thời gian request trung bình</h2>
        <ResponsiveContainer width="100%" height={300}>
          <Card style={{ backgroundColor: '#2c3e50', borderColor: 'white', width:'300px', height:'300px', color: 'white', fontSize:'25px',borderRadius:'50%',textAlign:'center',alignContent:'center'  }}>
          <p>{(requestTime / 1000).toFixed(10)} s</p>

            </Card>
        </ResponsiveContainer>
      </Col>
    </Row>


    </div>
  );
};

export default Dashboard;
