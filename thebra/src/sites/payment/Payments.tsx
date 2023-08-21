
// // >>>>>>>>>>>>>>>>>>>>
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import AppBar from "../../components/appbar/AppBar";
// import { Footer } from "../../components/footer/Footer";
// import "./style/payments.scss";

// export const Payments = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [totalAmount, setTotalAmount] = useState<number>(0);
//   const [clientSecret, setClientSecret] = useState("");
//   const searchParams = new URLSearchParams(location.search);
//   const orderId = searchParams.get("orderId");

//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("before fetching");
//       const orderResponse = await fetch(
//         `https://thebrabe.onrender.com/api/v1/order/${orderId}`
//       );
//       if (orderResponse.ok) {
//         const orderData = await orderResponse.json();
//         setTotalAmount(orderData.totalAmount);
//         console.log(totalAmount);
//       }
//     };
  
//     fetchData(); // Call the function to fetch data
//   }, []);

//   const handlePayment = async () => {
//     console.log(totalAmount)
//     const response = await fetch("https://thebrabe.onrender.com/api/v1/stripe/paymentintents", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: totalAmount * 100,
//         currency: "EUR",
//       }),
//     });

//     if (response.ok) {
//       const responseData = await response.json();
//       const clientSecret = responseData.clientSecret;
//       setClientSecret(clientSecret);
//       confirmPayment();
//     } else {
//       console.log("Failed to create PaymentIntent");
//       // Handle error
//     }
//   };

//   const confirmPayment = async () => {
//     if (!stripe || !elements) {
//       return;
//     }
  
//     const cardElement = elements.getElement(CardElement);
  
//     if (!cardElement) {
//       return;
//     }
  
//     const { paymentMethod, error } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });
  
//     if (error) {
//       console.log("Error creating payment method:", error);
//       return;
//     }
  
//     const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: paymentMethod.id,
//       }
//     );
  
//     if (paymentIntent) {
//         if (paymentIntent.status === "requires_action" && paymentIntent.next_action?.type === "redirect_to_url") {
//           // Payment Intent requires 3D Secure authentication
//           const redirectUrl = paymentIntent.next_action.redirect_to_url?.url;
//           if (redirectUrl) {
//             window.open(redirectUrl);
//           } else {
//             console.log("3D Secure authentication redirect URL is missing.");
//           }
//         } else if (paymentIntent.status === "succeeded") {
//           console.log("Payment done successfully");
//           // Handle any post-payment actions
//         }
//       } else if (paymentError) {
//         console.log("Payment failed:", paymentError.message);
//       }
//   };

//   return (
//     <div className="payment_container">
//       <AppBar />
//       <CardElement className="cardelement" />
//       <button onClick={handlePayment}>Pay ${totalAmount} now</button>
//       <Footer />
//     </div>
//   );
// };


// >>>>>>>>>>>>>>>>>>>>
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import AppBar from "../../components/appbar/AppBar";
import { Footer } from "../../components/footer/Footer";
import "./style/payments.scss";

export const Payments = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const fetchData = async () => {
      console.log("before fetching");
      const orderResponse = await fetch(
        `https://thebrabe.onrender.com/api/v1/order/${orderId}`
      );
      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        setTotalAmount(orderData.totalAmount);
        console.log(totalAmount);
      }
    };
  
    fetchData(); // Call the function to fetch data
  }, []);

  const handlePayment = async () => {
    console.log(totalAmount)
    const response = await fetch("https://thebrabe.onrender.com/api/v1/stripe/paymentintents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalAmount * 100,
        currency: "EUR",
      }),
    });

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
  
    const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );
  
    if (paymentIntent) {
        if (paymentIntent.status === "requires_action" && paymentIntent.next_action?.type === "redirect_to_url") {
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
      <CardElement className="cardelement" />
      <button onClick={handlePayment}>Pay ${totalAmount} now</button>
      <Footer />
    </div>
  );
};

