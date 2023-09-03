import { OrderProps } from "../../type/OrderProps";

export const fetcOrderhData = async (
  orderId: string
): Promise<OrderProps | null> => {
  try {
    const orderResponse = await fetch(
      `https://thebrabe.onrender.com/api/v1/order/${orderId}`
    );

    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      return orderData as OrderProps;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching order data:", error);
    return null;
  }
};
// >>>>>>>>>>>>>>>>>
export const checkIfOrderIsPaid = (orderData: any) => {
  if (orderData.paymentStatus === "paid") {
    return true;
  } else {
    return false;
  }
};
// >>>>>>>>>>>>>>>>>>>>>
// const handlePayment = async (
//   totalAmount: number,
//   orderId: string,
//   stripe: Function,
//   elements: Function,
//   setClientSecret: Function
// ) => {
//   const response = await fetch(
//     "https://thebrabe.onrender.com/api/v1/stripe/paymentintents",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: totalAmount * 100,
//         currency: "EUR",
//         orderId: orderId,
//       }),
//     }
//   );

//   if (response.ok) {
//     const responseData = await response.json();
//     const clientSecret = responseData.clientSecret;
//     setClientSecret(clientSecret);

//     const confirmPayment = async () => {
//       if (!stripe || !elements) {
//         return;
//       }
//       confirmPayment();
//     }
//     else {
//       console.log("Failed to create PaymentIntent");
//     }
//   }
// };
