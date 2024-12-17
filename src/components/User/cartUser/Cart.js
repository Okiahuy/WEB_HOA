import React, { useEffect, useState } from 'react';
import { Table, Button, message, Spin, Checkbox, Select, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import CartService from '../../../services/cartService';
import { DeleteOutlined } from '@ant-design/icons';
import OrderService from '../../../services/orderService';
import addressService from '../../../services/addressService';
import cartempty from '../../../assets/cartempty.png'; // Đường dẫn đến ảnh
import momologo from '../../../assets/momo-logo.png'; // Đường dẫn đến ảnh

const { Option } = Select;
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userAddresses, setuserAddressess] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [imageURLs, setImageURLs] = useState({}); // Lưu hình ảnh theo productID
  // Kiểm tra trạng thái đăng nhập
  const user = JSON.parse(localStorage.getItem('user')) || null; // Kiểm tra nếu `user` không tồn tại
  const accountID = user?.accountID;
  // Tính tổng tiền giỏ hàng
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalMomoVisible, setIsModalMomoVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
    // Tính tổng sl sp giỏ hàng
  const calculateTotalQuantity = () => selectedProducts.reduce((sum, item) => sum + item.quantity, 0);
    // Tính tổng tiền giỏ hàng
  const calculateTotalPrice = () => selectedProducts.reduce((sum, item) => sum + item.totalPrice, 0);

  useEffect(() => {
    const loadCart = async () => {
      if (!accountID) return; // Chỉ tải giỏ hàng nếu `accountID` tồn tại
      setLoading(false);
      try {
        const response = await CartService.getCartByAccountID(accountID);

        if (response.data) {
          setCartItems(response.data);
        } 

      } catch (error) {
        setCartItems([]);
        message.warning('Giỏ hàng trống.');
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [accountID]);

  useEffect(() => {
    const loadAddress = async () => {
      if (!accountID) return; // Chỉ tải giỏ hàng nếu `accountID` tồn tại
      setLoading(false);
      try {
        const response = await addressService.getAddressByAccountID(accountID);

        if (response.data) {
          setuserAddressess(response.data);
        } 

      } catch (error) {
        setuserAddressess([]);
      } finally {
        setLoading(false);
      }
    };
    loadAddress();
  }, [accountID]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        // Lấy hình ảnh cho tất cả các sản phẩm trong giỏ hàng
        const updatedImageURLs = {};
        for (const item of cartItems) {
          const response = await fetch(`http://localhost:5031/api/product/getImage/${item.productID}`);
          const data = await response.json();
          updatedImageURLs[item.productID] = data.imageURL; // Lưu hình ảnh vào state
        }
        setImageURLs(updatedImageURLs);
      } catch (error) {
        console.error('Lỗi khi lấy hình ảnh:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (cartItems.length > 0) {
      loadCart(); // Gọi hàm tải hình ảnh nếu có sản phẩm trong giỏ
    }
  }, [cartItems]);


  const handleAddAddress = () =>{
    navigate('/profile'); // Điều hướng đến trang đăng nhập
  }
   //Khi người dùng quay lại từ trang thanh toán MoMo, kiểm tra trạng thái kết quả
   const handleSelectProduct = (record, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, record]);
    } else {
      setSelectedProducts(selectedProducts.filter((item) => item.cartID !== record.cartID));
    }
  };


  const handleOpenModal = () => {
    if (selectedProducts.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleOpenModalMomo = () => {
    if (selectedProducts.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán.");
      return;
    }
    setIsModalMomoVisible(true);
  };
  //thanh toán khi nhận hàng
  const handlePayment = async () => {
    if (!paymentMethod) {
      message.warning("Vui lòng chọn phương thức thanh toán!");
      return;
    }
    if (!selectedAddress) {
      message.warning("Vui lòng chọn địa chỉ để giao hàng!");
      return;
    }
    const orderData = {
      accountID: user.accountID, // ID của tài khoản
      paymentID: paymentMethod,  // Phương thức thanh toán
      totalPrice: calculateTotalPrice() + 20000, // Tổng tiền thanh toán
      email: user.email, // Email người dùng
      addressID: selectedAddress,
      orderItemRequests: selectedProducts.map((item) => ({
        productID: item.productID, // ID sản phẩm
        quantity: item.quantity,   // Số lượng
        price: item.price,     // Giá mỗi sản phẩm
      })),
    };
    console.log("Dữ liệu gửi đến server:", JSON.stringify(orderData, null, 2));
    try {
      const result = await OrderService.Buy(orderData);
      message.success("Thanh toán thành công!");
      console.log("Kết quả:", result);
      setLoading(true);
      setIsModalVisible(false);
  } catch (error) {
      message.error("Thanh toán thất bại, vui lòng thử lại.");
      console.error("Lỗi khi thanh toán:", error);
  }
  };
  //thanh toán theo hình thức chuyển khoảng momo
  const handleMomoPayment = async () => {
    // Kiểm tra nếu không có sản phẩm nào được chọn
    if (selectedProducts.length === 0) {
      return message.warning("Vui lòng chọn sản phẩm để thanh toán!");
    }
    if (!selectedAddress) {
      message.warning("Vui lòng chọn địa chỉ để giao hàng!");
      return;
    }
    // Chuẩn bị dữ liệu đơn hàng
    const orderData = {
      accountID: user.accountID, // ID của tài khoản
      paymentID: 2, // ID của phương thức thanh toán (MoMo)
      totalPrice: calculateTotalPrice() + 20000, // Tổng tiền (bao gồm phí giao hàng)
      email: user.email, // Email người dùng
      addressID: selectedAddress,
      orderItemRequests: selectedProducts.map((item) => ({
        productID: item.productID,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      // Gửi yêu cầu thanh toán tới API
      const paymentResponse = await OrderService.Momo(orderData);

      if (paymentResponse?.payUrl) {
        window.location.href = paymentResponse.payUrl;
      } else {
        message.error("Không thể tạo liên kết thanh toán!");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Đã xảy ra lỗi khi thanh toán!"
      );
    }
    };

  const handleLogin = () => {
    navigate('/login'); // Điều hướng đến trang đăng nhập
  };

  //hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = async (cartID) => {
    try {
      const response = await CartService.removeFromCart(cartID,accountID);
      if (response.success) {
        setCartItems(response.data);
        message.success('Sản phẩm đã được xóa khỏi giỏ hàng.');
      } else {
        message.error('Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.');
      }
    } catch (error) {
      message.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
    }
  };
  
  //hàm cập nhật số lượng
  const handleQuantityChange = async (productID, quantityChange) => {
    const updatedCartItems = [...cartItems];
    const currentItem = updatedCartItems.find(item => item.productID === productID);

    if (currentItem) {
      const newQuantity = currentItem.quantity + quantityChange;

      // Check if the quantity is valid
      if (newQuantity <= 0) {
        message.error('Số lượng không thể nhỏ hơn hoặc bằng 0');
        return;
      }

      // Update quantity immediately in state
      currentItem.quantity = newQuantity;
      currentItem.totalPrice = currentItem.price * newQuantity;

      try {
        // Call the API to update the cart item quantity
        await CartService.updateCartItemQuantity(accountID, productID, newQuantity);
        
        // Update the state with the new cart items
        setCartItems(updatedCartItems);
        message.success('Cập nhật số lượng thành công');
      } catch (error) {
        message.error('Lỗi khi cập nhật số lượng');
      }
    }
  };

  // Định nghĩa cột cho bảng
  const columns = [
    {
      title: "Chọn",
      dataIndex: "cartID",
      key: "select",
      render: (cartID, record) => (
        <Checkbox
          onChange={(e) => handleSelectProduct(record, e.target.checked)}
          checked={selectedProducts.some((item) => item.cartID === cartID)}
        />
      ),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'productID',
      key: 'imageURL',
      render: (productID) => {
        const imageURL = imageURLs[productID];
        return imageURL ? (
          <img src={imageURL} alt="Ảnh sản phẩm" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        ) : (
          <span>Không có ảnh</span>
        );
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="link"
            onClick={() => handleQuantityChange(record.productID, -1)}
          >
            -
          </Button>
          <span>{record.quantity}</span>
          <Button
            type="link"
            onClick={() => handleQuantityChange(record.productID, 1)}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (price ? price.toLocaleString() : 'N/A'), // Định dạng số
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (totalPrice) => (totalPrice ? totalPrice.toLocaleString() : 'N/A'), // Định dạng số
    },
    {
      title: 'Trạng thái giỏ hàng',
      dataIndex: 'status_cart',
      key: 'status_cart',
      render: (status) => (status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'),
    },
    {
      title: '',
      key: 'delete',
      render: (text, record) => (
        <Button
          danger
          onClick={() => handleRemoveFromCart(record.cartID)}
        >
          <DeleteOutlined/>
        </Button>
      ),
    },
  ];

  return (
    <div>
    {user ? (
        <>
        <h2>Giỏ hàng của bạn</h2>
        {loading ? (
            <Spin tip="Đang tải giỏ hàng..." />
        ) : cartItems.length > 0? ( // Kiểm tra nếu giỏ hàng có sản phẩm
          <>
            <Table
              dataSource={cartItems}
              columns={columns}
              rowKey="productID"
              footer={() => (
                  <div style={{ fontWeight: 'bold', textAlign: 'right' }}>
                  Tổng tiền: {calculateTotalPrice().toLocaleString()} VND
                  </div>
              )}
              />
              <div style={{ textAlign: "right", marginTop: "10px" }}>
                <Button type="primary" onClick={handleOpenModal}>
                  Thanh toán
                </Button>
              </div>
              <div style={{ textAlign: "right", marginTop: "10px", height: 'auto' }}>
                <Button
                    type="primary"
                    style={{
                      textAlign: "right",
                      marginLeft: "10px",
                      borderColor: "transparent",
                      backgroundColor: 'transparent',
                      color: "crimson",
                      marginTop: "10px",
                      height: 'auto',
                    }}
                    onClick={handleOpenModalMomo}
                  >
                    <img
                      src={momologo}
                      alt="MoMo"
                      style={{ width: "50px", marginRight: "8px" }}
                    />
                    Ví Điện Tử MoMo
                  </Button>
              </div>
           </>
        ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Giỏ hàng trống.</h1>
              <img alt="Giỏ hàng trống" src={cartempty} width={250} height={300}/>
            </div>
        )}
        </>
    ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Vui lòng đăng nhập để xem giỏ hàng.</p>
        <Button type="primary" onClick={handleLogin}>
            Đăng nhập
        </Button>
        </div>
    )}
     {/* Modal Thanh Toán */}
     <Modal
        title="Thanh toán"
        visible={isModalVisible}
        onOk={handlePayment}
        onCancel={() => setIsModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <h3>Sản phẩm được chọn:</h3>
        <ul>
          {selectedProducts.map((item) => (
            <li key={item.cartID}>
              {item.productName} - {item.quantity} x {item.totalPrice.toLocaleString()} VND
            </li>
          ))}
        </ul>
        <p>
          <strong>Tổng số lượng:</strong> {calculateTotalQuantity()}
        </p>
        <p>
          <strong>Tổng tiền:</strong> {calculateTotalPrice().toLocaleString()} VND
        </p>
        <Select
          placeholder="Chọn phương thức thanh toán"
          style={{ width: "100%", marginTop: "10px" }}
          onChange={(value) => setPaymentMethod(value)}
        >
          <Option value="1">Thanh toán tiền mặt</Option>
        </Select>
         {/* Chọn địa chỉ giao hàng */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <Select
            placeholder={userAddresses.length > 0 ? "Chọn địa chỉ giao hàng" : "Chưa có địa chỉ nào"}
            style={{ flex: 1, marginRight: "10px" }}
            onChange={(value) => setSelectedAddress(value)}
            disabled={userAddresses.length === 0}
          >
            {userAddresses.map((address) => (
              <Option key={address.addressID} value={address.addressID}>
                {address.addressName+" ,thành phố "+address.city}
              </Option>
            ))}
          </Select>

          <Button type="primary" onClick={handleAddAddress}>
            Thêm địa chỉ
          </Button>
        </div>

        <p>
          <strong>Phí ship:</strong> 20,000 VND
        </p>
        <p>
          <strong>Tổng thanh toán:</strong>{" "}
          {(calculateTotalPrice() + 20000).toLocaleString()} VND
        </p>
        
      </Modal>

       {/* Modal Thanh Toán momo*/}
     <Modal
        title="Thanh toán"
        visible={isModalMomoVisible}
        onOk={handleMomoPayment}
        onCancel={() => setIsModalMomoVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <h3>Sản phẩm được chọn:</h3>
        <ul>
          {selectedProducts.map((item) => (
            <li key={item.cartID}>
              {item.productName} - {item.quantity} x {item.totalPrice.toLocaleString()} VND
            </li>
          ))}
        </ul>
        <p>
          <strong>Tổng số lượng:</strong> {calculateTotalQuantity()}
        </p>
        <p>
          <strong>Tổng tiền:</strong> {calculateTotalPrice().toLocaleString()} VND
        </p>
         {/* Chọn địa chỉ giao hàng */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
          <Select
            placeholder={userAddresses.length > 0 ? "Chọn địa chỉ giao hàng" : "Chưa có địa chỉ nào"}
            style={{ flex: 1, marginRight: "10px" }}
            onChange={(value) => setSelectedAddress(value)}
            disabled={userAddresses.length === 0}
          >
            {userAddresses.map((address) => (
              <Option key={address.addressID} value={address.addressID}>
                {address.addressName+" ,thành phố "+address.city}
              </Option>
            ))}
          </Select>

          <Button type="primary" onClick={handleAddAddress}>
            Thêm địa chỉ
          </Button>
        </div>

        <p>
          <strong>Phí ship:</strong> 20,000 VND
        </p>
        <p>
          <strong>Tổng thanh toán:</strong>{" "}
          {(calculateTotalPrice() + 20000).toLocaleString()} VND
        </p>
        
      </Modal>

    </div>
  );
};

export default CartPage;
