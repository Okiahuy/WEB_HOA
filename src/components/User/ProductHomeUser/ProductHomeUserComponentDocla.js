import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Spin ,Alert, Button, message } from 'antd';
import productService from '../../../services/productService';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CartService from '../../../services/cartService';
import FavoriteService from '../../../services/favoriteService';
const { Meta } = Card;

const ProductHomeUserComponentDocla = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await productService.getProductsForUserKieng(10, 6);
      const data = response.data;
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);

useEffect(() => {
  const fetchIsFavorite = async () => {
    try {
      // Gọi API lấy danh sách sản phẩm
      const response = await productService.getProductsForUserKieng(10, 6);
      const pros = response.data;

      // Tạo mảng chứa tất cả các productID
      const productIDs = pros.map(product => product.id);

      // Kiểm tra trạng thái yêu thích cho từng sản phẩm
      const favoriteStatusPromises = productIDs.map(async (productID) => {
        const status = await FavoriteService.checkIsFavorite(user.accountID, productID);
        return { productID, isFavorite: status };  // Trả về đối tượng {productID, isFavorite}
      });

      // Chờ tất cả các API kiểm tra yêu thích hoàn thành
      const favoriteStatuses = await Promise.all(favoriteStatusPromises);

      // Cập nhật trạng thái yêu thích cho tất cả các sản phẩm
      const favoriteProducts = favoriteStatuses.filter(status => status.isFavorite).map(status => status.productID);

      // Lưu danh sách các productID đã yêu thích vào state
      setFavorites(favoriteProducts);

    } catch (error) {
      console.error('Có lỗi khi lấy trạng thái yêu thích', error);
    }
  };

  if (user) {
    fetchIsFavorite();
  }
}, [user]);  // Chạy lại khi user thay đổi

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
          // Cập nhật lại danh sách yêu thích
          setFavorites((prevFavorites) => {
            if (prevFavorites.includes(productID)) {
              return prevFavorites.filter(id => id !== productID); // Bỏ yêu thích
            } else {
              return [...prevFavorites, productID]; // Thêm yêu thích
            }
          });
          message.success(response.message);
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
      <div style={{ padding: '20px' }}>
          <Row gutter={[16, 16]} justify="center" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {products.map(product => (
                
                  <Col xs={12} sm={8} md={6} lg={4} key={product.id}>
                   
                          <Card
                              hoverable
                              cover={ 
                                <Link to={`/product/${product.id}`}>
                                  <img alt={product.name} src={`http://localhost:5031${product.imageUrl}`} 
                                  style={{width: '180px', height: '200px', marginRight: '100px'}} loading="lazy"/>
                                </Link>
                              }
                          >
                            <div style={{ position: 'relative' }}>
                                    {/* Nhãn giảm giá */}
                                    {product.disPrice && (
                                        <span 
                                            style={{
                                                position: 'absolute',
                                                bottom: '200px',
                                                right: '-30px',
                                                backgroundColor: 'rgba(255, 0, 0, 0.7)',
                                                color: 'white',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {product.disPrice}%
                                        </span>
                                    )}
                                </div>
                              <Meta title={product.name} description={`Giá: ${product.price} VNĐ`} />
                              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                                    {/* Kiểm tra người dùng có tồn tại hay không */}
                                    {user ? (
                                      <>
                                        <Button
                                          style={{ color: 'green' }}
                                          onClick={() => handleAddToCart(user.accountID, product.id, 1)}
                                          icon={<ShoppingCartOutlined />}
                                        />
                                          <Button
                                            style={{ color: 'red' }}
                                            onClick={() => handleToggleFavorite(user.accountID, product.id)}
                                            icon={favorites.includes(product.id) ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined style={{ color: 'blue' }} />}
                                          >
                                            {favorites.includes(product.id) ? 'Đã thích' : 'Yêu thích'}
                                          </Button>
                                        
                                      </>
                                    ) : (
                                      // Nếu không đăng nhập, hiển thị nút đăng nhập
                                      <>
                                      <Button
                                          style={{ color: 'red' }}
                                          onClick={handleLoginPrompt}
                                          icon={<ShoppingCartOutlined />}
                                        />
                                      <Button
                                        style={{ color: 'red' }}
                                        onClick={handleLoginPrompt}
                                      >
                                        Đăng nhập
                                      </Button>
                                    </>
                                    )}
                                </div>
                          </Card>
                  </Col>
              ))}
          </Row>
      </div>
  );
};
  export default ProductHomeUserComponentDocla; // Export mặc định