import axios from "axios";
import { CartProps } from "../../type/CartProps";
import { isTokenExpired } from "../jwt/checkIfJwtExpried"
import { cartTotal } from "./computeCart";
import { isCartEmpty } from "./isCartEmpty";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../../type/DecodedToken";
type ShippingInfo = {
    address: string,
    city: string,
    postalCode: string,
    country: string
}

export const handleCartCheckout = async (navigate: Function, cart: CartProps[], deliveryPrice: number, shippingInfoForExistUsers: ShippingInfo) => {
    try {
        if (!isTokenExpired()) {
            const token = localStorage.getItem('jwt')
            if (!isCartEmpty()) {
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
                const userId = decodedToken?.userId ?? null
                //BE package
                const orderInfo = {
                    totalAmount: cartTotal(cart, deliveryPrice),
                    paymentStatus: 'pending',
                    shippingAddress: mergedAddress,
                    deliveryMethod: deliveryMethod,
                    userId: userId
                }
                const response = await axios.post("http://localhost:8080/api/v1/order/", JSON.stringify(orderInfo), {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                })
                if (response.status === 200) {
                    // navigate('/cart/payment/')
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