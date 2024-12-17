import React, { useEffect, useState } from 'react';
import { Alert, Spin, Table } from 'antd';
import AccountService from '../../../services/accountService';
import moment from 'moment';

const NotificationUser = () => {
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
  const accountID = user?.accountID;

  if (user) {
      const FullName = user.fullName; // Lấy Token
      console.log('User:', FullName); // In ra Token để kiểm tra
  } else {
      console.log('');
  }

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await AccountService.GetNotiByaccountID(accountID);
        setNotification(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (accountID) {
      loadNotifications();
    }
  }, [accountID]);
  
  
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
      title: 'Chi tiết',
      dataIndex: 'description',
      key: 'description',
    },
    {
        title: 'Thời gian',
        dataIndex: 'create',
        render: (create) => {
          // Using moment to show relative time
          return <span>{moment(create).fromNow()}</span>;
        },
      },
   
  ];

  return (
    <div>
      <Table columns={columns} dataSource={notification} pagination={false}/>
     
    </div>
  );
};

export default NotificationUser;
