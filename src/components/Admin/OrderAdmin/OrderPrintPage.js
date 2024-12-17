import React, { useEffect, useState } from 'react'; ///npm install react-to-print
import { PrinterOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import OrderService from '../../../services/orderService';
import { Button } from 'antd';
// import chaugo from '../../../assets/banner-hoakieng.jpg'



const OrderPrintPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    // Fetch order details from the API
    const fetchOrderDetails = async () => {
      const response = await OrderService.getOrdePrint(id);
      setOrder(response.data);
    };
    fetchOrderDetails();
     // Optionally, update the time every second if you want a real-time update
     const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleString());
      }, 5000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
  }, [id]);

  const handlePrint = () => {
    const printContent = document.getElementById('print');
    if (printContent) {
      const printWindow = window.open('', '', 'height=700,width=1000');
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(printContent.innerHTML); // Copy the content to the print window
      printWindow.document.write('</body></html>');
      printWindow.document.close(); // Close the document for printing
      printWindow.print(); // Trigger the print dialog
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontSize: '18px' }}>
        <div id="print">
        {order && order.orderInfo ? (
        <div className="wrapper">
            <section className="invoice">
            <div className="row">
                <div className="col-xs-12">
                <h2 className="page-header">
                    <i className="fa fa-globe"></i> SHOP HOA  <br />
                    <small className="pull-right" style={{ color: 'darkorange', fontSize: '17px' }}>
                    Ngày: {currentTime}
                    </small>
                </h2>
                </div>
            </div>
            
            <div className="row invoice-info" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <div className="col-sm-4 invoice-col" style={{ marginRight: '20px' }}>
                Từ
                <address>
                    <strong style={{ color: 'crimson', fontSize: '20px', marginTop: '10px' }}>SHOP HOA</strong><br />
                    Cao Lãnh Đồng Tháp<br />
                    Huyện Tháp Mười<br />
                    Số điện thoại: +093094934
                </address>
                </div>
                <div className="col-sm-4 invoice-col" style={{ marginRight: '20px', marginTop: '10px' }}>
                Đến
                <address>
                    <strong style={{ color: 'crimson', fontSize: '20px', marginTop: '10px' }}>
                    Khách Hàng: {order.orderInfo.customerName}
                    </strong><br />
                    {order.orderInfo.customerAddress}<br />
                    Số điện thoại: {order.orderInfo.customerPhone}
                </address>
                </div>
                <div className="col-sm-4 invoice-col">
                <b style={{ color: 'crimson', fontSize: '20px', marginTop: '10px' }}>HÓA ĐƠN: HOA</b><br />
                <b style={{ color: 'crimson', fontSize: '13px', marginTop: '10px' }}>MÃ HÓA ĐƠN - </b> {order.orderInfo.code_order}<br />
                <b style={{ color: 'crimson', fontSize: '13px', marginTop: '10px' }}>NGÀY ĐẶT</b> {new Date(order.orderInfo.order_date).toLocaleDateString()}<br />
                <b style={{ color: 'crimson', fontSize: '13px', marginTop: '10px' }}></b> {order.orderInfo.customerAddress}
                </div>
            </div>

            <div className="row">
                <div className="col-xs-12 table-responsive">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th style={{ color: 'darkorange', fontSize: '11px' }}>STT</th>
                        <th style={{ color: 'darkorange', fontSize: '11px' }}>TÊN SẢN PHẨM</th>
                        <th style={{ color: 'darkorange', fontSize: '11px' }}>NHÀ CUNG CẤP</th>
                        <th style={{ color: 'darkorange', fontSize: '11px' }}>MÀU SẮC</th>
                        <th style={{ color: 'darkorange', fontSize: '11px' }}>MÔ TẢ</th>
                        <th style={{ color: 'darkorange', fontSize: '11px' }}>DANH MỤC</th>
                        <th style={{ color: 'darkorange', fontSize: '11px' }}>LOẠI</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.orderDetails.map((item, index) => (
                        <tr key={index}>
                        <td style={{ color: 'rgb(71, 41, 3)', fontSize: '10px' }}>{index + 1}</td>
                        <td style={{ color: 'rgb(71, 41, 3)', fontSize: '10px' }}>{item.name}</td>
                        <td style={{ color: 'rgb(71, 41, 3)', fontSize: '10px' }}>{item.supplier}</td>
                        <td style={{ color: 'rgb(71, 41, 3)', fontSize: '10px' }}>
                            <img src={`http://localhost:5031${item.img}`} alt={item.name} style={{ width: '50px', height: '50px' }} />
                        </td>
                        <td style={{ color: 'rgb(71, 41, 3)', fontSize: '10px' }}>{item.description}</td>
                        <td style={{ color: 'rgb(71, 41, 3)', fontSize: '10px' }}>{item.category}</td>
                        <td style={{ color: 'rgb(71, 41, 3)', fontSize: '10px' }}>{item.type}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>

            <div className="row">
                <div className="col-xs-6">
                <p className="lead" style={{ color: 'crimson' }}>PHƯƠNG THỨC THANH TOÁN</p>
                <p className="text-muted well well-sm no-shadow" style={{ marginTop: '10px', color: 'darkorange' }}>
                    {order.orderInfo.paymentMethod}
                </p>
                </div>
                <div className="col-xs-6">
                <p className="lead">NGÀY ĐẶT: {new Date(order.orderInfo.order_date).toLocaleDateString()}</p>
                <div className="table-responsive">
                    <table className="table">
                    <tr>
                        <th style={{ width: '100%', color: 'crimson' }}>TỔNG TIỀN:</th>
                        <td style={{ width: '100%', color: 'crimson' }}>
                        {order.orderInfo.totalPrice.toLocaleString()} VND
                        </td>
                    </tr>
                    </table>
                </div>
                </div>
            </div>
            </section>
        </div>
        ) : (
            <p>Loading order data...</p> // You can show a loading state while waiting for the data
        )}
        </div>
            <Button
                style={{ color: 'green' ,width: '100px', height:'100px', border: '1px solid green'}}
                onClick={handlePrint}
            ><PrinterOutlined style={{ color: 'green', fontSize: '50px'  }}/></Button>
        </div>
  );
};

export default OrderPrintPage;
