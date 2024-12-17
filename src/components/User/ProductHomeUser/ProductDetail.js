import React, { useEffect, useState } from 'react';
import { Card, Col, Descriptions, Row, Button, Spin, Alert, message } from 'antd';
import productService from '../../../services/productService';
import { useParams } from 'react-router-dom'; // To get the product ID from the URL
import { DollarOutlined, HeartOutlined, HeartFilled, ShoppingCartOutlined, FileTextOutlined, LoginOutlined} from '@ant-design/icons';
import Service from '../about/service';
import FavoriteService from '../../../services/favoriteService';
import ProductHomeUserComponentDocla from './ProductHomeUserComponentDocla';
import { Rate } from 'antd';

import CartService from '../../../services/cartService';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  
  const [isFavorite, setIsFavorite] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const FullName = user.fullName; // Lấy Token
    const AccountID = user.accountID;
    console.log('User:', FullName + ' accountID:', AccountID); // In ra Token để kiểm tra
  } else {
      console.log('Không có người dùng đăng nhập.');
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productService.getProductById(id); 
        setProduct(response.data);
      } catch (err) {
        setError('Lỗi khi lấy chi tiết sản phẩm.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchIsFavorite = async () => {
        const productID = id;
        const favoriteStatus = await FavoriteService.checkIsFavorite(user.accountID, productID);
        setIsFavorite(favoriteStatus);
    };
    if(user != null){
      fetchIsFavorite();
    }
      
  }, );


   const handleAddToCart = async (accountID, productID, quantity) => {
    try {
      const response = await CartService.addToCart(accountID, productID, quantity);
      if (response.success) {
        message.success('Sản phẩm đã được thêm vào giỏ hàng.');
      } else {
        message.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
      }
    } catch (error) {
      message.error('Có lỗi khi thêm sản phẩm vào giỏ hàng.');
    } finally {
      setLoading(false);
    }
  };
  //hàm login nếu chưa log
  const handleLoginPrompt = () => {
    message.info('Vui lòng đăng nhập để thêm vào giỏ hàng hoặc yêu thích.');
   
  };
  //hàm cập nhật yêu thích
  const handleToggleFavorite = async (accountID, productID) => {
    try {
        const response = await FavoriteService.ToggleFavorite(accountID,productID);
        if (response.success) {
          message.success(response.message);
          setIsFavorite((prev) => !prev); // Đảo trạng thái
      } else {
          message.error(response.message);
      }
     } catch (error) {
        message.error('Có lỗi xảy ra khi cập nhật yêu thích!');
    }
};

  if (loading) {
    return (
      <Spin spinning={true} tip="Đang tải...">
        <div>Đang tải sản phẩm...</div>
      </Spin>
    )
  }

  if (error) {
    return <Alert message="Có lỗi xảy ra" type="error" />;
  }

  return (
  
    product && (
      <div>
      <Card
        style={{ width: '100%' }}
      >
        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col span={12}>
            <Card bordered={true}
              hoverable
              cover={<img alt={product[0].name} src={`http://localhost:5031${product[0].imageUrl}`} style={{with: '230px', height: '450px', marginRight: '100px'}}/>}
            >
            </Card>
          </Col>
          <Col span={12}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Tên sản phẩm">🌸{product[0].name}🌸</Descriptions.Item>
              <Descriptions.Item label="Danh mục">
                {product[0]?.category?.name || "Không có dữ liệu"}
              </Descriptions.Item>
              <Descriptions.Item label="Nhà cung cấp"> {product[0]?.supplier?.name || `ID: ${product[0]?.supplierId}`}</Descriptions.Item>
              <Descriptions.Item label="Giá"><DollarOutlined style={{ color: 'green' }} /> {`${product[0].price} VNĐ`} <DollarOutlined style={{ color: 'green' }} /></Descriptions.Item>
              <Descriptions.Item label="Mô tả"><FileTextOutlined style={{ color: 'blue' }} />{product[0].description} <FileTextOutlined style={{ color: 'blue' }} /></Descriptions.Item>
              <Descriptions.Item label="Lượt thích">
              <HeartFilled style={{ color: 'red' }} />  {product[0].likecount} lượt thích <HeartFilled style={{ color: 'red' }} />
              </Descriptions.Item>
              <Descriptions.Item label="Đánh giá gần đây">
                <Rate disabled defaultValue={5} /> 
              </Descriptions.Item>
            </Descriptions>
              <Row gutter={16}>
                      {user ? (
                          <>
                           <Col span={12}>
                              <Button  
                                style={{ color: 'green', marginTop: '20px', width: '100%' }}
                                onClick={() => handleAddToCart(user.accountID, product[0].id, 1)}
                                icon={<ShoppingCartOutlined />}
                                >
                                Thêm giỏ hàng
                              </Button>
                            </Col>
                            <Col span={12}>
                              <Button
                                style={{ color: 'red', marginTop: '20px', width: '100%' }}
                                onClick={() => handleToggleFavorite(user.accountID, product[0].id)}
                                icon={isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined style={{ color: 'blue' }}/>}
                              >
                                {isFavorite ? 'Bạn Đã thích' : 'Yêu thích'}
                              </Button>
                            </Col>
                          </>
                        ) : (
                          // Nếu không đăng nhập, hiển thị nút đăng nhập
                          <>
                          <Col span={24}>
                              <Button  
                                  style={{ color: 'red', marginTop: '20px', width: '100%' }}
                                  onClick={handleLoginPrompt}
                                  icon={<LoginOutlined />}
                                  >
                               Đăng nhập ngay
                                </Button>
                            </Col>
                           
                        </>
                        )}
                    
             </Row>
          </Col>
        </Row>
       
      </Card>

      
      <Service/>
     
      <h1>Hoa Kiểng Độc Lạ Việt Nam</h1>
      {/* sp chính về hoa kiểng Độc lạ*/}
      <ProductHomeUserComponentDocla/>
      </div>
    )
   
  );
};

export default ProductDetail;
