import { ShippingInfoForNonUser } from "../../type/ShippingInfo";
import { cartTotal } from "./computeCart";
import { CartProps } from "../../type/CartProps";
import { useState } from "react";

export const handleSaveOrderForNonUser = async (
  cart: CartProps[],
  deliveryPrice: number,
  shippingInfoForNonUsers: ShippingInfoForNonUser,
  isInFinland:boolean,
  isZone1:boolean,
  isZone2:boolean
) => {
  const { address, city, postalCode, country, gmail } = shippingInfoForNonUsers;
  const mergedAddress = `${address},${city},${postalCode},${country}`;
  // const [isInFinland, setIsInFinland] = useState(false);
  // const [isZone1, setIsZone1] = useState(false);
  // const [isZone2, setIsZone2] = useState(false);
  // if (country === "Finland") {
  //   setIsInFinland(true);
  // } else if (
  //   country === "Latvia" ||
  //   country === "Lithuania" ||
  //   country === "Estonia"
  // ) {
  //   setIsZone1(true);
  // } else {
  //   setIsZone2(true);
  // }
  let deliveryMethod = "";
  if (deliveryPrice === 5.95) {
    deliveryMethod = "Standard";
  } else if (deliveryPrice === 12.95) {
    deliveryMethod = "Express";
  } else if (deliveryPrice === 10.95) {
    deliveryMethod = "Home";
  }
  //BE package
  const orderInfo = {
    totalAmount: cartTotal(cart, deliveryPrice, isInFinland, isZone1, isZone2),
    paymentStatus: "pending",
    shippingAddress: mergedAddress,
    deliveryMethod: deliveryMethod,
    orderDate: new Date(),
    anonymousUserGmail: gmail,
    country: country,
  };

  const response = await fetch(
    "https://thebrabe.onrender.com/api/v1/order/forNonUser",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderInfo),
    }
  );

  return response;
};
