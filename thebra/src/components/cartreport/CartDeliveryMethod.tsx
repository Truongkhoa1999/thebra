import { ChangeEvent, SetStateAction, useMemo, useState } from "react"
import { handleSwitchDeliveryType } from "../../util/cart/hanldeSwitchDeliveryType"
import { deliveryFee } from "../../data/deliveryCost";
import './style/cartreport.scss'
import { handleCartCheckout } from "../../util/cart/handleCartCheckout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { cartTotal } from "../../util/cart/computeCart";
import { CartHeadingForDeliveryForm } from "./CartHeadingForDeliveryForm";
export const CartDeliveryMethod = () => {
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(0)
    const deliveryPrice = deliveryFee[selectedDeliveryType];
    const navigate = useNavigate()
    const { cart } = useSelector((state: RootState) => state.cart)
    const [shippingInfoForExistUsers, setShippingInfoForExistUsers] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfoForExistUsers((prevInfo) => ({ ...prevInfo, [name]: value }));
    };
    const totalPrice = useMemo(() => cartTotal(cart, deliveryPrice), [deliveryPrice])

    return (
        <div className='delivery_method'>
            <fieldset>
                <div>
                    <input type="radio" id="standard" name="drone" value={0}
                        checked onChange={(e) => handleSwitchDeliveryType(e, setSelectedDeliveryType)} />
                    <label htmlFor="standard">Standard Delivery To Posti Outlet (5-7 Days) 5.95 €.</label>
                </div>

                <div>
                    <input type="radio" id="express" name="drone" value={1} onChange={(e) => handleSwitchDeliveryType(e, setSelectedDeliveryType)} />
                    <label htmlFor="express">Express Delivery To Posti Outlet (1-3 Business Days) 12.95 €.</label>
                </div>
                <div>
                    <input type="radio" id="home" name="drone" value={2} onChange={(e) => handleSwitchDeliveryType(e, setSelectedDeliveryType)} />
                    <label htmlFor="home">Standard Delivery To Posti Outlet (4-7 Days) 10.95 €.</label>
                </div>
            </fieldset>
            <h2 className="total-price">Subtotal: {totalPrice} €</h2>
            <CartHeadingForDeliveryForm />
            <div className='checkout_container'>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleCartCheckout(navigate, cart, deliveryPrice, shippingInfoForExistUsers)
                }}>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="address"
                            value={shippingInfoForExistUsers.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            value={shippingInfoForExistUsers.city}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Postal Code:
                        <input
                            type="text"
                            name="postalCode"
                            value={shippingInfoForExistUsers.postalCode}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Country:
                        <input
                            type="text"
                            name="country"
                            value={shippingInfoForExistUsers.country}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />
                    <button className='checkout-button' type="submit">Check out</button>
                </form>
            </div>
        </div>
    )
}