import { useEffect, useState } from "react";
import { OrderProps } from "../../type/OrderProps";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  checkIfOrderIsPaid,
  fetcOrderhData,
} from "../../util/order/fetchOrderData";
// style
import "./style/paymentinfo.scss";
export const PaymentInfo = () => {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const [isPaid, setIsPaid] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
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
  // get data already

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await fetcOrderhData(orderId!);
        if (orderData != null) {
          const isPaid = checkIfOrderIsPaid(orderData);
          if (isPaid) {
            setIsPaid(isPaid);
          }
          setOrder(orderData);
          setTotalAmount(orderData.totalAmount);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, [orderId]);
  // handle payment>>>>>
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
    <div className="paymentInfo_container">
      <div className="orderInfo_container">
        <h2 className="title">My order</h2>
        <p>Address: {order.shippingAddress}</p>
        <p>Total: {totalAmount}€</p>
        <p>Payment Status: {order.paymentStatus}</p>
        {/* <div className="subInfo_container">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/power-by-stripe_03.png?alt=media&token=0cf0e15e-7e07-40ae-81b2-19d93baf1761"
            alt=""
          />
        </div> */}
      </div>
      <div className="payment_form">
        <CardElement className="cardelement" />
      </div>
      <button
        disabled={isPaid}
        className={` ${isPaid ? "pay_button-disabled" : "pay_button"}`}
        onClick={handlePayment}
      >
        Pay Now
      </button>
      <div className="stripeInfo_container">
        <h2>We support - Powered By Stripe </h2>
        <img
          src="https://imgix.bustle.com/elite-daily/2016/05/07051134/13100877_1117225501673213_1002803250533131677_n.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
          alt=""
        />
        <img
          src="https://imgix.bustle.com/elite-daily/2016/05/07051134/13100877_1117225501673213_1002803250533131677_n.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
          alt=""
        />
        <img
          src="https://imgix.bustle.com/elite-daily/2016/05/07051134/13100877_1117225501673213_1002803250533131677_n.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
          alt=""
        />
        <img
          src="https://imgix.bustle.com/elite-daily/2016/05/07051134/13100877_1117225501673213_1002803250533131677_n.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
          alt=""
        />
        <img
          src="https://imgix.bustle.com/elite-daily/2016/05/07051134/13100877_1117225501673213_1002803250533131677_n.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
          alt=""
        />
        <img
          src="https://imgix.bustle.com/elite-daily/2016/05/07051134/13100877_1117225501673213_1002803250533131677_n.jpg?w=1200&h=630&fit=crop&crop=faces&fm=jpg"
          alt=""
        />
      </div>
    </div>
  );
};
