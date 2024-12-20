import React, { useEffect, useState } from 'react';
import { Alert, Spin, Table } from 'antd';
import statisticService from '../../../services/statisticService';

const InvoiceList = () => {
  const [invoice, setInvoices] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInvoices();
  }, []);
  
  const loadInvoices = async () => {
    try {
      // Gọi API để lấy danh sách đơn hàng
      const response = await statisticService.GetInvoice();
      const fetchedOrders = response.data;
      setInvoices(fetchedOrders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  const columns = [
    {
      title: '#',
      dataIndex: 'invoiceID',
      key: 'invoiceID',
    },
    {
        title: 'Tên Người Dùng',
        dataIndex: 'customerName',
        key: 'accountName',
      },
    {
      title: 'Ngày',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      render: (invoiceDate) => <span>{new Date(invoiceDate).toLocaleDateString('vi-VN')}</span>,
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (totalAmount) => `${totalAmount.toLocaleString()} VND`,
    },
    {
      title: 'Phương Thức Thanh Toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
     
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
        key: 'address',
      },
     
  ];

  return (
    <div>
      <h2>Hóa đơn đã in</h2>
      {loading ? (
        <Spin size="large" />
      ) : invoice?.length === 0 ? (
        <p>Chưa có hóa đơn nào.</p>
      ) : (
        <Table columns={columns} dataSource={invoice} pagination={{ pageSize: 10 }} />
      )}
    </div>
  );
};

export default InvoiceList;
