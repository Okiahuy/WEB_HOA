import React, { useState, useEffect,useCallback  } from "react";
import { Layout, Select, Slider, Spin ,Alert, List, Card, Row, Col, Button, message } from "antd";
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import FavoriteService from "../../services/favoriteService";
import productService from "../../services/productService";
import CartService from "../../services/cartService";

import "../../pages/css/productHomeCss.css";

const { Sider, Content } = Layout;
const { Meta } = Card;
const { Option } = Select;


const ProductHome = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(6);
    const [priceRange, setPriceRange] = useState([1000, 2900000]);
    const [sortOption, setSortOption] = useState("name-asc"); // Lưu tùy chọn sắp xếp
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(false);

    const handleCategoryClick = useCallback(async (categoryId) => {
        try {
            const response = await productService.getProductsForCategoryID(categoryId);
            const data = response.data;
            setProducts(data);
            setSelectedCategoryId(categoryId); // Update selected category
    
            // Check if user is logged in (user is not null)
            const user = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
    
            if (user && user.accountID) { // Ensure user exists and accountID is available
                const pros = response.data;
                const productIDs = pros.map(product => product.id);
    
                // Check the favorite status of each product
                const favoriteStatusPromises = productIDs.map(async (productID) => {
                    const status = await FavoriteService.checkIsFavorite(user.accountID, productID);
                    return { productID, isFavorite: status };
                });
    
                // Wait for all promises to resolve
                const favoriteStatuses = await Promise.all(favoriteStatusPromises);
                const favoriteProducts = favoriteStatuses.filter(status => status.isFavorite).map(status => status.productID);
                setFavorites(favoriteProducts);
            } else {
                // If no user is logged in, reset the favorites
                setFavorites([]);
            }
        } catch (error) {
            console.error('Error while fetching products or favorites:', error);
            setProducts([]);
        }
    }, []);
    
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await productService.getCategoriesForUser();
                const data = response.data; 
                if (Array.isArray(data) && data.length > 0) {
                    setCategories(data); // Cập nhật danh mục
                    handleCategoryClick(6);
                } else {
                    message.info("Không có sản phẩm theo danh mục");
                    setCategories([]); // Đảm bảo mảng trống nếu không có danh mục
                }
            } catch (error) {
                message.error("Không thể tải danh mục!");
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadCategories();
    }, [handleCategoryClick]);


    const handleFilterAndSort = async (sortOption, priceRange) => {
        const [minPrice, maxPrice] = priceRange;
        const categoryId = selectedCategoryId;
        try {
            // Gửi yêu cầu API với các tham số lọc và sắp xếp
            const response = await productService.getProductsByCategoryAndSort(categoryId, minPrice, maxPrice, sortOption);
            const data = response.data;

            if (Array.isArray(data) && data.length > 0) {
                setProducts(data);  // Cập nhật sản phẩm nếu có kết quả
                   
            } else {
                message.info("Không có sản phẩm theo yêu cầu.");
                setProducts([]);  // Nếu không có sản phẩm, set mảng rỗng
            }
        } catch (error) {
            console.error("Có lỗi khi lấy sản phẩm", error);
            setProducts([]);
        }
    };
    // Xử lý thay đổi tùy chọn sắp xếp
    const handleSortChange = (value) => {
        setSortOption(value);
        handleFilterAndSort(value, priceRange);  // Gọi hàm chung
    };
    
    // Xử lý thay đổi bộ lọc giá
    const handlePriceFilter = (value) => {
        setPriceRange(value);
        handleFilterAndSort(sortOption, value);  // Gọi hàm chung
    };
    
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
        <Layout style={{ minHeight: "40vh" }}>
            {/* Sidebar */}
            <Sider className="Sider-producthome" width={200}>
            <h3 style={{ color: "white", padding: "10px" }}>Danh mục</h3>
                {/* Render categories as an unordered list */}
                <ul style={{ listStyleType: "none", padding: 0 }}>
                {categories.length > 0 ? (
                    categories.map((item) => (
                        <List.Item
                            key={item.id}
                            onClick={() => handleCategoryClick(item.id)}
                            className="ul-producthome"
                            style={{
                                cursor: "pointer",
                                padding: "10px",
                                borderBottom: "1px solid #ddd",
                            }}
                        >
                            {item.name}
                        </List.Item>
                    ))
                ) : (
                    <p>No categories available.</p>  // Handle the case when categories is not an array or is empty
                )}
                </ul>

            </Sider>

            {/* Main Content */}
            <Layout>
                <Content style={{ margin: "2px 16px", padding: 24, background: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                    <Sider className="Sider-producthome" width="100%">
                        {/* Render categories as a horizontal list of circular buttons */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px' }}>
                            {categories.length > 0 ? (
                            categories.map((item) => (
                                <div
                                key={item.id}
                                onClick={() => handleCategoryClick(item.id)}
                                className="category-item"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: 'white', // Customize the background color
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '10px',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                }}
                                >
                                    {/* Image inside the circle */}
                                    <img
                                        src={`http://localhost:5031${item.imageUrl}`} // Assuming each category has an imageUrl
                                        alt={item.name}
                                        style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius:'50%',
                                        objectFit: 'cover', // Ensures the image covers the entire circle
                                        }}
                                    />
                                    </div>
                            ))
                            ) : (
                            <p>No categories available.</p> // Handle the case when categories is not an array or is empty
                            )}
                        </div>
                        </Sider>
                    </div>
                    {/* Search Bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
                        {/* Search Input */}
                        <Select
                            style={{ flex: 1, color: 'black' }}
                            onChange={handleSortChange}
                            defaultValue="name-asc"
                           
                        >
                            <Option value="name-asc">Tên: A-Z</Option>
                            <Option value="name-desc">Tên: Z-A</Option>
                            <Option value="price-asc">Giá: Tăng dần</Option>
                            <Option value="price-desc">Giá: Giảm dần</Option>
                        </Select>
                        
                        {/* Price Filter */}
                        <div style={{ flex: 2 }}>
                            <h3 style={{ marginBottom: "-10px" }}>Lọc theo giá</h3>
                            <Slider
                                range
                                min={10000}
                                max={4000000}
                                step={5000}
                                value={priceRange} // Giá trị mặc định
                                onChange={(value) => setPriceRange(value)} // Cập nhật state khi kéo
                                onChangeComplete={handlePriceFilter} // Xử lý khi người dùng dừng kéo
                            />
                        </div>
                    </div>
                    {/* Product List */}
                    <Row gutter={[16, 16]} justify="center" style={{ display: "flex", flexWrap: "wrap" }}>
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product) => (
                                <Col xs={14} sm={10} md={8} lg={6} key={product.id}>
                                    <Card
                                        hoverable
                                        cover={
                                            <Link to={`/product/${product.id}`}>
                                                <img
                                                    alt={product.name}
                                                    src={`http://localhost:5031${product.imageUrl}`}
                                                    style={{
                                                        width: "100%",
                                                        height: "200px",
                                                        objectFit: "cover",
                                                    }}
                                                    loading="lazy"
                                                />
                                            </Link>
                                        }
                                    >
                                        {/* Label giảm giá */}
                                        {product.disPrice && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "-10px",
                                                    left: "-10px",
                                                    backgroundColor: "rgba(255, 0, 0, 0.7)",
                                                    color: "white",
                                                    padding: "5px",
                                                    borderRadius: "5px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {product.disPrice}%
                                            </span>
                                        )}
                                        <Meta title={product.name} description={`Giá: ${product.price.toLocaleString()} VNĐ`} />
                                        <div style={{ marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                                            
                                            {user ? (
                                                <>
                                                    <Button
                                                        style={{ color: "green" }}
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
                                                <>
                                                    <Button
                                                        style={{ color: "green" }}
                                                        onClick={handleLoginPrompt}
                                                        icon={<ShoppingCartOutlined />}
                                                    />
                                                    <Button style={{ color: "red" }} onClick={handleLoginPrompt}>
                                                        Đăng nhập
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <h3>Không tìm thấy sản phẩm nào!</h3>
                            </div>
                        )}
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
    };

    export default ProductHome;