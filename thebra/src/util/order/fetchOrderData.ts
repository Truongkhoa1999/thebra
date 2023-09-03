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
// >>>>>>
export const fetchOrderDataByUserId = async (
  jwtToken: string 
): Promise<OrderProps | null> => {
  try {
    const orderResponse = await fetch(
      `https://thebrabe.onrender.com/api/v1/order/myOrders`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the headers
        },
      }
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