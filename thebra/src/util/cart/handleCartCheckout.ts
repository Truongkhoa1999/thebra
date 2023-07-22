import { CartProps } from "../../type/CartProps";
import { isTokenExpired } from "../jwt/checkIfJwtExpried"
import { isCartEmpty } from "./isCartEmpty";

import { handleSavedOrderItems } from "./handleSavedOrderItems";
import { ShippingInfo } from "../../type/ShippingInfo";
import { handleSaveOrder } from "./handleSaveOrder";


export const handleCartCheckout = async (cart: CartProps[], deliveryPrice: number, shippingInfoForExistUsers: ShippingInfo) => {
    try {
        if (!isTokenExpired()) {
            const token = localStorage.getItem('jwt')
            if (!isCartEmpty()) {
                const response = await handleSaveOrder(cart, token, deliveryPrice, shippingInfoForExistUsers)
                if (response.status === 200) {
                    const order = await response.json(); 
                    console.log(order)
                    await handleSavedOrderItems(cart, order.id)
                    console.log("ur cart has been saved in our BE")
                }
            } else {
                throw new Error('Your cart is empty!');

            }
        } else {
            throw new Error('User login session has been expired, please sign-in again.');

        }
    } catch (error: any) {
        console.error(error.message);
    }
};