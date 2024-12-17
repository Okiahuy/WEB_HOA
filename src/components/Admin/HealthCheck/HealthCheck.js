import React, { useEffect, useState } from 'react';

function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState('Loading...');
  const [checks, setChecks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm lấy tình trạng sức khỏe từ API
    const fetchHealthStatus = async () => {
      try {
        const response = await fetch('http://localhost:5031/health'); // Thay đổi URL với API của bạn
        if (!response.ok) {
          setHealthStatus('Unhealthy');
          return;
        }
        const data = await response.json();
        setHealthStatus(data.status); // Cập nhật trạng thái tổng thể từ API
        setChecks(data.checks); // Cập nhật danh sách các kiểm tra sức khỏe
      } catch (err) {
        setHealthStatus('Unhealthy');
        setError(err.message);
      }
    };

    // Gọi healthcheck mỗi 60 giây
    const intervalId = setInterval(fetchHealthStatus, 60000);

    // Lần đầu gọi healthcheck
    fetchHealthStatus();

    // Cleanup khi component bị unmount
    return () => clearInterval(intervalId);
  }, []);

  // Hàm để xác định màu sắc của trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case 'Healthy':
        return 'green';
      case 'Degraded':
        return 'orange';
      case 'Unhealthy':
        return 'red';
      default:
        return 'gray'; // Mặc định là màu xám nếu không có trạng thái
    }
  };

  return (
    <div>
      <h3>Health Check Status: {healthStatus}</h3>
      {error && <p>Error: {error}</p>}

      <h4>Details:</h4>
      {checks.length > 0 ? (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse',fontSize:'20px' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Exception</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {checks.map((check, index) => (
              <tr key={index}>
                <td>{check.name}</td>
                <td style={{ color: getStatusColor(check.status) }}>{check.status}</td>
                <td style={{ color: check.exception ? 'red' : 'gray' }}>
                  {check.exception ? check.exception : 'N/A'}
                </td>
                <td style={{ color: 'InactiveCaptionText' }}>{check.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading health check details...</p>
      )}
    </div>
  );
}

export default HealthCheck;
