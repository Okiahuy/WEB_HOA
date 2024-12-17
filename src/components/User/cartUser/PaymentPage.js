import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const momoPayUrl = searchParams.get("url"); // Lấy URL MoMo từ query params

  useEffect(() => {
    if (!momoPayUrl) {
      alert("Không tìm thấy URL thanh toán. Quay lại giỏ hàng.");
      window.location.href = "/cart"; // Điều hướng về trang giỏ hàng nếu không có URL
      window.close();
    }
  }, [momoPayUrl]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Thanh toán MoMo</h2>
      {momoPayUrl ? (
        <iframe
          src={momoPayUrl}
          title="Trang thanh toán MoMo"
          style={{
            width: "100%",
            height: "90vh",
            border: "none",
          }}
        ></iframe>
      ) : (
        <p>Không tìm thấy liên kết thanh toán.</p>
      )}
    </div>
  );
};

export default PaymentPage;
