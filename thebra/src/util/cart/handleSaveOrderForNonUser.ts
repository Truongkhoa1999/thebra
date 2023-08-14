import { ShippingInfo } from "../../type/ShippingInfo";
import { cartTotal } from "./computeCart";
import { CartProps } from "../../type/CartProps";

export const handleSaveOrderForNonUser = async (cart: CartProps[], deliveryPrice: number, shippingInfoForExistUsers: ShippingInfo) => {
    const { address, city, postalCode, country } = shippingInfoForExistUsers
    const mergedAddress = `${address},${city},${postalCode},${country}`
    let deliveryMethod = '';
    if (deliveryPrice === 5.95) {
        deliveryMethod = 'Standard';
    } else if (deliveryPrice === 12.95) {
        deliveryMethod = 'Express';
    } else if (deliveryPrice === 10.95) {
        deliveryMethod = 'Home';
    }
    //BE package
    const orderInfo = {
        totalAmount: cartTotal(cart, deliveryPrice),
        paymentStatus: 'pending',
        shippingAddress: mergedAddress,
        deliveryMethod: deliveryMethod,
        orderDate: new Date(),
        // userId: isSignedIn ? userId : ""
        // userId: ""
    }

    const response = await fetch('https://thebrabe.onrender.com/api/v1/order/forNonUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderInfo)
    })

    return response
}