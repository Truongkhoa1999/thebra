// >>>>>>>>>>>>>>>>>>>>
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import "./style/payments.scss";
import { OrderProps } from "../../type/OrderProps";
import { CheckOutProgress } from "../../components/checkoutprogress/CheckOutProgress";

export const Payments = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isPaid, setIsPaid] = useState(false);

  const [order, setOrder] = useState<OrderProps>({
    id: "",
    totalAmount: 0,
    paymentStatus: "",
    shippingAddress: "",
    deliveryMethod: "",
    orderDate: new Date(),
    userId: "",
    anonymousUserId: "",
    anonymousUserGmail: "",
    paymentRequestId: "",
    country: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const fetcOrderhData = async () => {
      const orderResponse = await fetch(
        `https://thebrabe.onrender.com/api/v1/order/${orderId}`
      );
      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        if (orderData.paymentStatus === "paid") {
          setIsPaid(true);
        }
        setTotalAmount(orderData.totalAmount);
        setOrder(orderData);
      }
    };

    fetcOrderhData();
  }, []);

  const handlePayment = async () => {
    console.log(totalAmount);
    const response = await fetch(
      "https://thebrabe.onrender.com/api/v1/stripe/paymentintents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount * 100,
          currency: "EUR",
          orderId: orderId,
        }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const clientSecret = responseData.clientSecret;
      setClientSecret(clientSecret);
      confirmPayment();
    } else {
      console.log("Failed to create PaymentIntent");
      // Handle error
    }
  };

  const confirmPayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("Error creating payment method:", error);
      return;
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (paymentIntent) {
      if (
        paymentIntent.status === "requires_action" &&
        paymentIntent.next_action?.type === "redirect_to_url"
      ) {
        // Payment Intent requires 3D Secure authentication
        const redirectUrl = paymentIntent.next_action.redirect_to_url?.url;
        if (redirectUrl) {
          window.open(redirectUrl);
        } else {
          console.log("3D Secure authentication redirect URL is missing.");
        }
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment done successfully");
        // Handle any post-payment actions
      }
    } else if (paymentError) {
      console.log("Payment failed:", paymentError.message);
    }
  };

  return (
    <div className="payment_container">
      <AppBar />
      <CheckOutProgress orderId={orderId}/>
      <div className="paymentInfo_container">
        <div className="orderInfo_container">
          <h2>My order</h2>
          <p>Address: {order.shippingAddress}</p>
          <p>Total: {totalAmount}€</p>
          <p>Payment Status: {order.paymentStatus}</p>
          <div className="subInfo_container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/power-by-stripe_03.png?alt=media&token=0cf0e15e-7e07-40ae-81b2-19d93baf1761"
              alt=""
            />
          </div>
        </div>
        <div className="payment_form">
          <CardElement className="cardelement" />
          <button
            disabled={isPaid}
            className={` ${isPaid ? "pay_button-disabled" : "pay_button"}`}
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
