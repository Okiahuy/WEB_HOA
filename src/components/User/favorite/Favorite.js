import React, { useEffect, useState } from 'react';
import { Button, Card, Col, message,Row,Spin} from 'antd';
import FavoriteService from '../../../services/favoriteService';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CartService from '../../../services/cartService';
import ProductHomeUserComponentKieng from '../ProductHomeUser/ProductHomeUserComponentKieng';
const { Meta } = Card;


const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || null; // Kiểm tra nếu `user` không tồn tại
  //const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await FavoriteService.getFavoriteByAccountID(user.accountID); // Gọi API lấy danh sách yêu thích
        if (response.success) {
          setFavorites(response.data); // Gán danh sách sản phẩm yêu thích

        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error('Có lỗi xảy ra khi lấy danh sách yêu thích!');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]); // Chỉ chạy lại khi `user` thay đổi

  useEffect(() => {
    const fetchIsFavorite = async () => {
        try {
            // Gọi API lấy danh sách sản phẩm yêu thích của người dùng
            const response = await FavoriteService.getFavoriteByAccountID(user.accountID);

            if (response.data && response.data.length > 0) {
                // Giả sử API trả về danh sách sản phẩm yêu thích
                const productID = response.data[0].id; // Lấy id sản phẩm yêu thích
                
                // Kiểm tra nếu sản phẩm này có trong danh sách yêu thích
                const favoriteStatus = await FavoriteService.checkIsFavorite(user.accountID, productID);
                
                // Cập nhật trạng thái yêu thích
                setIsFavorite(favoriteStatus); 
            }
        } catch (error) {
            console.error('Có lỗi khi lấy thông tin yêu thích', error);
        }
    };

    // Kiểm tra khi `user.accountID` thay đổi
    if (user && user.accountID) {
        fetchIsFavorite();
    }
}, ); 

  if (!user) {
    return <p>Vui lòng đăng nhập để xem danh sách yêu thích của bạn.</p>;
  }
  if (loading) {
    return (
      <Spin spinning={true} tip="Đang tải...">
        <div>Đang tải sản phẩm...</div>
      </Spin>
    )
  }

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh sách sản phẩm yêu thích</h1>

          <Row gutter={[16, 16]} justify="center" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {favorites.map(product => (
                  <Col xs={12} sm={8} md={6} lg={4} key={product.id}>
                          <Card
                              hoverable
                              cover={ 
                                <Link to={`/product/${product.id}`}>
                                  <img alt={product.name} src={`http://localhost:5031${product.imageUrl}`} 
                                  style={{width: '180px', height: '200px', marginRight: '100px'}}/>
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
                                          style={{ color: 'red'}}
                                          onClick={() => handleToggleFavorite(user.accountID, product.id)}
                                          icon={isFavorite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined style={{ color: 'blue' }}/>}
                                        >
                                          {isFavorite ? 'Đã thích' : 'Yêu thích'}
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
     
      <h1>Các sản phẩm hoa kiểng khác</h1>
     <ProductHomeUserComponentKieng/>
    </div>
  );
};


export default FavoritePage;
