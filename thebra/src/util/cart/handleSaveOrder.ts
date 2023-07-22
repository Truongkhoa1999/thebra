import jwtDecode from "jwt-decode";
import { ShippingInfo } from "../../type/ShippingInfo";
import { DecodedToken } from "../../type/DecodedToken";
import { cartTotal } from "./computeCart";
import { CartProps } from "../../type/CartProps";

export const handleSaveOrder = async (cart: CartProps[], token: any, deliveryPrice: number, shippingInfoForExistUsers: ShippingInfo) => {
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
    const decodedToken = token ? (jwtDecode(token) as DecodedToken) : null
    const userId = decodedToken?.userId
    //BE package
    const orderInfo = {
        totalAmount: cartTotal(cart, deliveryPrice),
        paymentStatus: 'pending',
        shippingAddress: mergedAddress,
        deliveryMethod: deliveryMethod,
        orderDate: new Date(),
        userId: userId
    }
    const response = await fetch('http://localhost:8080/api/v1/order/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderInfo)
    })

    return response
}