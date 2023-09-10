import { ChangeEvent, useEffect, useState } from "react";
import { OrderProps } from "../../type/OrderProps";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  checkIfOrderIsPaid,
  fetcOrderhData,
} from "../../util/order/fetchOrderData";

// style
import "./style/paymentinfo.scss";
import { CartImageItems } from "../cartimageitems/CartImageItems";
import ThankYouNotification from "../notification/ThankYouNotification";
export const PaymentInfo = () => {
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const [isPaid, setIsPaid] = useState(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
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
    setIsLoading(true);
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
          userEmail: email,
        }),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const clientSecret = responseData.clientSecret;
      setClientSecret(clientSecret);
      confirmPayment();
      setIsLoading(false);
    } else {
      console.log("Failed to create PaymentIntent");
      setIsLoading(false);
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
        localStorage.removeItem("cart");
        localStorage.removeItem("orderId");
        setIsNotificationVisible(true);
      }
    } else if (paymentError) {
      console.log("Payment failed:", paymentError.message);
    }
  };

  return (
    <div className="paymentInfo_container">
      <div className="orderInfo_container">
        <h2 className="title">My order</h2>
        <p>Delivery address: {order.shippingAddress}</p>
        <p>Total: {totalAmount}€</p>
        <p>Payment Status: {order.paymentStatus}</p>
        <p className="courier">
          Courier Company: <span style={{ color: "orange" }}>Posti</span>{" "}
        </p>
        <CartImageItems />
      </div>
      <div className="payment_form">
        <CardElement className="cardelement" />
        <input
          className="emailInput"
          placeholder="Your email address"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button
          disabled={isPaid}
          className={` ${isLoading ? "loading-text" : "pay_button"}`}
          onClick={handlePayment}
        >
          Pay Now
        </button>
        {/* payment card support */}
        <div className="stripeInfo_container">
          <p>We accept the following cards </p>
          <div className="logo_container">
            <h1 className="logo-card visa">VISA</h1>
            <h1 className="logo-card ddc">
              Disc<span style={{ color: "orange" }}>o</span>ver
            </h1>
            <h1 className="logo-card mc">
              <span style={{ color: "black" }}>Master</span>
              <span style={{ color: "red" }}>Card</span>
            </h1>
            <h1 className="logo-card ae">American Express</h1>

            <h1 className="logo-card">
              <span style={{ color: "blue" }}>Japan</span>
              <span style={{ color: "red" }}>Credit</span>
              <span style={{ color: "green" }}>Bureau</span>
            </h1>

            <h1 className="logo-card cu">
              <span style={{ color: "red" }}>China</span>
              <span style={{ color: "blue" }}> Union</span>
              <span style={{ color: "#00908b" }}> Pay </span>
            </h1>
          </div>
        </div>
        {/* >>>> */}
      </div>
      <div className="additional">
        <h2> 🔒 Secure Privacy</h2>
        <p>
          Protecting your privacy is important to us! Please be assured that
          your information will be kept secured and uncompromised. We do not
          sell your personal information for money and will only use your
          information in accordance with our privacy and cookie policy to
          provide and improve our services to you.
        </p>
      </div>
      {isNotificationVisible && (
        <ThankYouNotification
          notification="Payment successfull. Thank you for reaching out. Your order is placed in our store. Dispatch your order soon!"
          className="signin-notification"
          setIsNotificationVisible={setIsNotificationVisible}
        />
      )}
    </div>
  );
};
