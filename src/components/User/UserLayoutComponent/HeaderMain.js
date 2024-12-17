import React from 'react';
import { Layout, Menu , Col, Row} from 'antd';
import { Link} from 'react-router-dom';
import { HomeOutlined, UserOutlined, SettingFilled, AccountBookOutlined, ShoppingCartOutlined,ProductOutlined } from '@ant-design/icons'



const { Header} = Layout;

const logout = () => {
  // Xóa thông tin người dùng khỏi localStorage
  localStorage.removeItem('user');
  console.log('Đăng xuất thành công.');
  // Có thể thêm logic điều hướng về trang đăng nhập hoặc trang chính
  window.location.href = '/login'; // Thay đổi đường dẫn tùy ý onClick={logout()}
};

const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

if (user) {
    const FullName = user.fullName; // Lấy Token

    console.log('User:', FullName); // In ra Token để kiểm tra
} else {
    console.log('Không có người dùng đăng nhập.');
}

const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}/>,
      label: <Link to="/home" style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>TRANG CHỦ</Link>,
    },
    {
      key: '2',
      icon: <ProductOutlined style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}/>,
      label: <Link to="/product" style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>SẢN PHẨM</Link>,
    },
    // {
    //   key: '3',
    //   icon: <AppstoreOutlined style={{ color: 'white' }} />,
    //   label: <span style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}>DANH MỤC</span>,
    //   children: [
    //     {
    //       key: '3-1',
    //       label: <Link to="/category1" style={{ color: 'black' }}>Danh mục 1</Link>,
    //     },
    //     {
    //       key: '3-2',
    //       label: <Link to="/category2" style={{ color: 'black' }}>Danh mục 2</Link>,
    //     },
    //     {
    //       key: '3-3',
    //       label: <Link to="/category3" style={{ color: 'black' }}>Danh mục 3</Link>,
    //     },
    //   ],
    // },
    {
      key: '4',
      icon: <ProductOutlined style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}/>,
      label: <Link to="/about" style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>VỀ CHÚNG TÔI</Link>,
    },

    {
      key: '5',
      icon: <AccountBookOutlined style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}/>,
      label: <Link to="/new" style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>TIN TỨC</Link>,
    },

    {
      key: '6',
      icon: <ShoppingCartOutlined style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}/>,
      label: 
        <Link to="/cart" style={{ fontSize: '12px', fontWeight: 'bold', color: 'white' }}> 
          <span style={{
             marginLeft: '5px',
              backgroundColor: 'white',
               color: 'black',
                borderRadius: '50%',
                 padding: '2px 4px',
                  position: 'relative',
                  top:'-10px',
                  right:'20px'
                 }}>

                {user != null ? user.totalItems : 0}

          </span>
        </Link>,
      
    },

    {
      key: '7',
      icon: <UserOutlined style={{ color: 'white' }} />,
      label: <span style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}>TÀI KHOẢN</span>,
      children: [

        {
          key: '7-1',
          icon: <UserOutlined style={{ color: 'black' }} />,
          label:  user != null ? (
                <>
                  <span style={{ marginRight: 20, fontSize: '15px', color: 'black' }}>{user.fullName}!</span>
                  <Link to="#" onClick={logout} style={{ fontSize: '15px', color: 'black' }}>Đăng xuất</Link>
                </>
                ) : (
                      <Link to="/login" style={{ fontSize: '15px', color: 'black' }}>Đăng nhập</Link>
                ),
        },
        {
          key: '7-2',
          icon: <SettingFilled style={{ color: 'black' }} />,
          label: user != null ? (
                <>
                  <span style={{ marginRight: 20, fontSize: '15px', color: 'black' }}>Thông tin</span>
                  <Link to="/profile" style={{ fontSize: '15px', color: 'black' }}></Link>
                </>
                ) : (
                  <Link to="/product" style={{ fontSize: '15px', color: 'black' }}>Sản phẩm</Link>
            ),
        },

      ],
    },

    // {
    //   key: '4',
    //   label: user != null ? (
    //     <>
    //       <span style={{ marginRight: 20, fontSize: '15px', fontWeight: 'bold', color: 'white' }}>Xin chào, {user.fullName}!</span>
    //       <Link to="/settings" onClick={logout} style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>Đăng xuất</Link>
    //     </>
    //   ) : (
    //     <Link to="/login" style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>Đăng nhập</Link>
    //   ),
    // },
  ];


const HeaderMain = () => {
  return (
      <Header style={{ background: '#ff6666', minHeight: '100px' }}>
            <Row justify="center" align="middle" style={{ textAlign: 'center', height: '100%' }}>
                <Col xs={24} sm={24} md={16}>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ background: '#ff6666', border: 'none' }}
                    items={menuItems}
                    />
                </Col>
            </Row>
        </Header>

  );
};

export default HeaderMain;
