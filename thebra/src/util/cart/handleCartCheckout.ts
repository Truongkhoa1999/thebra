import { CartProps } from "../../type/CartProps";
import { isNonUser, isTokenExpired } from "../jwt/checkIfJwtExpried"
import { isCartEmpty } from "./isCartEmpty";

import { ShippingInfo } from "../../type/ShippingInfo";
import { handleSaveOrderForExistUser } from "./handleSaveOrderForExistUser";
import { handleSaveOrderForNonUser } from "./handleSaveOrderForNonUser";
import { handleSavedOrderItemsForExistUser } from "./handleSavedOrderItemsForExistUser";
import { handleSavedOrderItemsForNonUser } from "./handleSavedOrderItemsForNonUser";


export const handleCartCheckout = async (
    navigate: Function,
    cart: CartProps[],
    deliveryPrice: number,
    shippingInfoForExistUsers: ShippingInfo,
    setIsNotificationVisible: (value: boolean) => void,
) => {
    try {
        // first IF
        if (!isTokenExpired()) {
            const token = localStorage.getItem('jwt')
            if (!isCartEmpty()) {
                const response = await handleSaveOrderForExistUser(cart, token, deliveryPrice, shippingInfoForExistUsers)
                if (response.status === 200) {
                    const order = await response.json();
                    for (const item of cart) {
                        await handleSavedOrderItemsForExistUser([item], order.id)

                    }
                    navigate(`/payment?orderId=${order.id}`)
                    console.log("ur cart has been saved in our BE")
                }
            }
            else {
                throw new Error('Your cart is empty!');

            }
            // second if
        } else if (isNonUser()) {
            const response = await handleSaveOrderForNonUser(cart, deliveryPrice, shippingInfoForExistUsers)
            if (response.status === 200) {
                const order = await response.json();
                for (const item of cart) {
                    await handleSavedOrderItemsForNonUser([item], order.id)

                }
                navigate(`/payment?orderId=${order.id}`)
                console.log("ur cart has been saved in our BE")
            }
        } else {
            setIsNotificationVisible(true)
            throw new Error('User login session has been expired, please sign-in again.');
        }
    } catch (error: any) {
        console.error(error.message);
    }
};