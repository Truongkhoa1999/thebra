import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { deliveryFee } from "../../data/deliveryCost";
import "./style/cartreport.scss";
import { handleCartCheckout } from "../../util/cart/handleCartCheckout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { cartTotal } from "../../util/cart/computeCart";
import { CartHeadingForDeliveryForm } from "./CartHeadingForDeliveryForm";
import "./style/cartdeliverymethod.scss";
import SignInSuggestion from "../notification/signin/SignInSuggestion";
import { isNonUser } from "../../util/jwt/checkIfJwtExpried";
import { smoothScroll } from "../../util/window/smoothScroll";
export const CartDeliveryMethod = () => {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(0);
  const deliveryPrice = deliveryFee[selectedDeliveryType];
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isFreeShip, setIsFreeShip] = useState(false);

  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [isOutsideFinland, setIsOutSideFinland] = useState(false);
  const [shippingInfoForExistUsers, setShippingInfoForExistUsers] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    telephone: "",
  });
  const [shippingInfoForNonUsers, setshippingInfoForNonUsers] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    gmail: "",
    telephone: "",
  });
  const countryData = [
    { value: "Finland", label: "Finland" },
    { value: "Russia", label: "Russia" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "country") {
      const isOutsideFinland = value !== "Finland";
      setIsOutSideFinland(isOutsideFinland);
      setSelectedDeliveryType(isOutsideFinland ? 1 : 0);
      smoothScroll("deliverySection", true);
      setShippingInfoForExistUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
      setshippingInfoForNonUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
      console.log(shippingInfoForExistUsers);
      console.log(shippingInfoForNonUsers);
    } else {
      setShippingInfoForExistUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
      setshippingInfoForNonUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
      console.log(shippingInfoForExistUsers);
      console.log(shippingInfoForNonUsers);
    }
  };

  const totalPrice = useMemo(
    () => cartTotal(cart, deliveryPrice, isOutsideFinland),
    [deliveryPrice]
  );
  useEffect(() => {
    if (totalPrice >= 49 && !isOutsideFinland) {
      setIsFreeShip(true);
    }
  }, [isFreeShip,selectedDeliveryType]);
  return (
    <div id="deliverySection" className="delivery_method">
      <div className="deliveryMethod_container">
        <button
          disabled={true}
          className={`methodButton ${
            selectedDeliveryType === 0 ? "methodButton-active" : ""
          }`}
        >
          {isFreeShip? "Standard Delivery Inside Finland (1-3 Business Days) 0€.": "Standard Delivery Inside Finland (1-3 Business Days) 5.95 €."}
        </button>
        <button
          disabled={true}
          className={`methodButton ${
            selectedDeliveryType === 1 ? "methodButton-active" : ""
          }`}
        >
          Standard Delivery Outside Finland (7-10 Business Days) 12.95€.
        </button>
        <h2 className="total-price">Subtotal: {totalPrice} €</h2>
      </div>

      <CartHeadingForDeliveryForm />
      <div className="checkout_container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCartCheckout(
              navigate,
              cart,
              deliveryPrice,
              shippingInfoForExistUsers,
              shippingInfoForNonUsers,
              setIsNotificationVisible
            );
          }}
        >
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
            <h5 className="country_note">
              The delivery fee will change based on your country.
            </h5>
            <select
              name="country"
              value={shippingInfoForExistUsers.country}
              onChange={handleChange}
              required
            >
              {countryData.map((country, index) => (
                <option key={index} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Telephone:
            <input
              type="text"
              name="telephone"
              // value={shippingInfoForExistUsers.telephone shippingInfoForNonUsers.telephone}
              value={
                isNonUser()
                  ? shippingInfoForNonUsers.telephone
                  : shippingInfoForExistUsers.telephone
              }
              onChange={handleChange}
              required
            />
          </label>
          {isNonUser() && (
            <label>
              Gmail:
              <input
                type="email"
                name="gmail"
                value={shippingInfoForNonUsers.gmail}
                onChange={handleChange}
                required
              />
            </label>
          )}
          <br />
          <button className="checkout-button" type="submit">
            Check out
          </button>
        </form>
      </div>
      {isNotificationVisible && (
        <SignInSuggestion
          className="signin-notification"
          setIsNotificationVisible={setIsNotificationVisible}
        />
      )}
    </div>
  );
};
