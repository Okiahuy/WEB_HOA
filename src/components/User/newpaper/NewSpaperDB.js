import React, { useEffect, useState } from 'react';
import { Alert, Spin, Table } from 'antd';
import AccountService from '../../../services/accountService';

const NewSpaperDB = () => {
  const [Newpaper, setNewpaper] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const response = await AccountService.GetAllNewpaper();
        setNewpaper(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, []);
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
        dataIndex: 'imageUrl',
        key: 'imageUrl',
        render: (imageUrl) => (
          <img src={`${imageUrl}`} alt="Newpaper" style={{ width: '100px', height: '100px' }} />
        ),
      },
    {
        dataIndex: 'newpaperTitle',
        key: 'newpaperTitle',
    },
    {
        dataIndex: 'mota',
        key: 'mota',
    },
  ];
  
  return (
    <div>
      <h2>Tin tức mới nhất</h2>
      <Table columns={columns} dataSource={Newpaper} pagination={{pageSize: 1}}/>

      <Table columns={columns} dataSource={Newpaper} pagination={false}/>
    </div>
  );
};

export default NewSpaperDB;
