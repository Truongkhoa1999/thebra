import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import "./style/payment.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { handlePayment } from "../../util/cart/handlePayment";
import Preloader from "../../components/loader/Preloader";

export const Payment = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get orders information
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `https://thebrabe.onrender.com/api/v1/order/${orderId}`
        );
        if (response.ok) {
          const orderData = await response.json();
          setTotalAmount(orderData.totalAmount);
          console.log(totalAmount);
          handlePayment(totalAmount, orderData.id);
          setIsLoading(false);
          console.log(orderData.id)
          console.log(isLoading);
        } else {
          console.log("Failed to fetch order data");
          setIsLoading(false);
          console.log(isLoading);
        }
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(true);
      }
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="payment_container">
      <AppBar />
      <h1>Payment Process</h1>
      <h5>If payment tab is not pop-up, please hit the button below</h5>
      {isLoading ? <Preloader /> : null}{" "}
      {/* Show loading indicator if isLoading is true */}
      <button onClick={()=>handlePayment(totalAmount, orderId!)}>Process payment</button>
      <Footer />
    </div>
  );
};
