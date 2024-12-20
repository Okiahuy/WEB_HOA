import React, { useEffect, useState } from 'react';
import { Card, Col, Descriptions, Row, Button, Spin, message, Form, Input } from 'antd';
import productService from '../../../services/productService';
import { useParams } from 'react-router-dom'; // To get the product ID from the URL
import { DollarOutlined, HeartOutlined, HeartFilled, ShoppingCartOutlined, FileTextOutlined, LoginOutlined} from '@ant-design/icons';
import Service from '../about/service';
import FavoriteService from '../../../services/favoriteService';
import AccountService from '../../../services/accountService';
import { Rate } from 'antd';

import CartService from '../../../services/cartService';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  
  const [isFavorite, setIsFavorite] = useState(false);
  const [descriptionAnswer, setDescriptionAnswer] = useState('');
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const FullName = user.fullName; // Lấy Token
    const AccountID = user.accountID;
    console.log('User:', FullName + ' accountID:', AccountID); // In ra Token để kiểm tra huy@email.com
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

  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await AccountService.GetAnswersByProductId(id);
            setQuestions(response.data);
        } catch (err) {
          
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchQuestions();
}, [id]);


   const handleAddToCart = async (accountID, productID, quantity) => {
    try {
      const response = await CartService.addToCart(accountID, productID, quantity);
      if (response.success) {
        message.success('Sản phẩm đã được thêm vào giỏ hàng.');
      } else {
        message.error('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.');
      }
    } catch (error) {
      console.log(error);
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

const handleSubmit = async (values) => {
  // Construct the answer object using form values and user session data
  const answer = {
    fullnameAnswer: user?.fullName || values.fullnameAnswer, // Use user fullname or form value
    emailAnswer: user?.email || values.emailAnswer, // Use user email or form value
    descriptionAnswer: values.descriptionAnswer,
    productID: id, // Ensure this is passed if needed
    accountID: user?.accountID,
  };
  
  try {
    const response = await AccountService.addAnswer(answer);
    
    if (response.data) {
      // Success: Reset form and show success message
      alert('Bình luận đã được gửi!');
      form.resetFields(); // Reset the form
    } else {
      alert('Có lỗi xảy ra.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Có lỗi khi gửi bình luận.');
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
    console.log("Chưa có câu hỏi nào",error);
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

      <h3>Câu hỏi & Bình luận của người dùng</h3>
      <ul>
          {questions.length != null ? (
              questions.map((question) => (
                  <li key={question.answerID}>
                      <p><strong>{question.fullnameAnswer}</strong>: {question.descriptionAnswer}</p>
                      <p>Email: {question.emailAnswer}</p>
                      <p>Ngày: {new Date(question.date).toLocaleString()}</p>
                  </li>
              ))
          ) : (
              <p>Chưa có câu hỏi nào cho sản phẩm này.</p>
          )}
      </ul>

      <Form form={form} onFinish={handleSubmit}>
      {user && (
        <>
         <Form.Item
            label="Họ và tên"
            name="fullnameAnswer" // This binds the fullnameAnswer field
            initialValue={user?.fullName} // Set the initial value from user session data
            rules={[{ required: true, message: 'Họ và tên là bắt buộc' }]} // Validation rule
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="Bình luận" name="descriptionAnswer" required>
            <Input.TextArea
              value={descriptionAnswer}
              onChange={(e) => setDescriptionAnswer(e.target.value)}
              rows={4}
              placeholder="Nhập bình luận"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi bình luận
            </Button>
          </Form.Item>
        </>
      )}
      
    </Form>

      <Service/>
      </div>
    )
   
  );
};

export default ProductDetail;
