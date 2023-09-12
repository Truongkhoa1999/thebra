import { CartProps } from "../../type/CartProps";
import { isNonUser, isTokenExpired } from "../jwt/checkIfJwtExpried";
import { isCartEmpty } from "./isCartEmpty";

import { ShippingInfo, ShippingInfoForNonUser } from "../../type/ShippingInfo";
import { handleSaveOrderForExistUser } from "./handleSaveOrderForExistUser";
import { handleSaveOrderForNonUser } from "./handleSaveOrderForNonUser";
import { handleSavedOrderItemsForExistUser } from "./handleSavedOrderItemsForExistUser";
import { handleSavedOrderItemsForNonUser } from "./handleSavedOrderItemsForNonUser";

export const handleCartCheckout = async (
  // navigate: any,
  cart: CartProps[],
  deliveryPrice: number,
  shippingInfoForExistUsers: ShippingInfo,
  shippingInfoForNonUsers: ShippingInfoForNonUser,
  setIsNotificationVisible: (value: boolean) => void,
  isInFinland: boolean,
  isZone1: boolean,
  isZone2: boolean
): Promise<String | null> => {
  try {
    // first IF
    if (!isTokenExpired()) {
      const token = localStorage.getItem("jwt");
      if (!isCartEmpty()) {
        const response = await handleSaveOrderForExistUser(
          cart,
          token,
          deliveryPrice,
          shippingInfoForExistUsers,
          isInFinland,
          isZone1,
          isZone2
        );
        if (response.status === 200) {
          const order = await response.json();
          for (const item of cart) {
            await handleSavedOrderItemsForExistUser([item], order.id);
          }
          if (order.id) {
            localStorage.setItem("orderId", order.id);
            // navigate(`/payments?orderId=${order.id}`);
            return order.id;
          } else {
            console.log("orderId is null");
            return null;
          }
        }
      } else {
        throw new Error("Your cart is empty!");
      }
      // second if
    } else if (isNonUser()) {
      const response = await handleSaveOrderForNonUser(
        cart,
        deliveryPrice,
        shippingInfoForNonUsers,
        isInFinland,
        isZone1,
        isZone2
      );
      if (response.status === 200) {
        const order = await response.json();
        for (const item of cart) {
          await handleSavedOrderItemsForNonUser([item], order.id);
        }
        if (order.id) {
          localStorage.setItem("orderId", order.id);
          // navigate(`/payments?orderId=${order.id}`);
          return order.id;
        } else {
          console.log("orderId is null");
          return null;
        }
      }
    } else {
      setIsNotificationVisible(true);
      throw new Error(
        "User login session has been expired, please sign-in again."
      );
    }
    return null;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
};
