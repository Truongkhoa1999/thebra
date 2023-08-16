import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./style/paymentform.scss";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { handlePayment } from "../../util/cart/handlePayment";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const totalAmountInCents = Math.round(totalAmount * 100);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // Get orders informaiton
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `https://thebrabe.onrender.com/api/v1/order/${orderId}`
        );
        if (response.ok) {
          const orderData = await response.json();
          setTotalAmount(orderData.totalAmount);
        } else {
          console.log("Failed to fetch order data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="payment_form_container">
      <div>
        <h1>Payment</h1>
        <CreditCardIcon />
      </div>
      {/* <PaymentElement /> */}
      <CardElement className="card-elements" />
      <button
        disabled={!stripe}
        onClick={() => {
          // handlePayment(stripe, elements, totalAmountInCents, orderId);
          handlePayment(stripe, elements, totalAmountInCents);

        }}
      >
        Pay EUR Now
      </button>

    </div>
  );
};
