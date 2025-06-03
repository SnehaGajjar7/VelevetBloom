import React, { useContext, useEffect } from "react";
import "./Varify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("order_id");
const orderStatus = searchParams.get("order_status");

  const { url } = useContext(CartContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        orderId,
        success: orderStatus === "PAID" ? "true" : "false",
      });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log("Verification failed", err);
      navigate("/");
    }
  };
  
  
  
  useEffect(() => {
    console.log("Verifying order:", { success, orderId });
    if (!orderId || !success) {
      navigate("/");
      return;
    }
    verifyPayment();
  }, []);
  
  
  

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
