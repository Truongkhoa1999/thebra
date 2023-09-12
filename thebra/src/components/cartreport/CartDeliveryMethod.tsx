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
import { countryData } from "../../data/countryData";
export const CartDeliveryMethod = () => {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState(0);
  const [isFreeShipForZone1, setIsFreeShipForZone1] = useState(false);
  const [isFreeShipForZone2, setIsFreeShipForZone2] = useState(false);

  const deliveryPrice = deliveryFee[selectedDeliveryType];
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isFreeShipForFinland, setIsFreeShipForFinland] = useState(false);
  // isZone
  const [isInFinland, setisInFinland] = useState(true);
  const [isZone1, setIsZone1] = useState(false);
  const [isZone2, setIsZone2] = useState(false);
  // >>
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.cart);
  const [shippingInfoForExistUsers, setShippingInfoForExistUsers] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "Finland",
    telephone: "",
  });
  const [shippingInfoForNonUsers, setshippingInfoForNonUsers] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "Finland",
    gmail: "",
    telephone: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "country") {
      const selectedCountry = countryData.find((country) =>
        Array.isArray(country.label)
          ? country.label.includes(value)
          : country.value === value
      );

      if (selectedCountry) {
        setSelectedDeliveryType(
          selectedCountry.value === "zone1"
            ? 1
            : selectedCountry.value === "zone2"
            ? 2
            : 0
        );
        setIsZone1(selectedCountry.value === "zone1");
        setIsZone2(selectedCountry.value === "zone2");
        setisInFinland(selectedCountry.value === "Finland");
      }
      smoothScroll("deliverySection", true);

      setShippingInfoForExistUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
      setshippingInfoForNonUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    } else {
      setShippingInfoForExistUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
      setshippingInfoForNonUsers((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
    localStorage.removeItem("orderId");
  };

  const totalPrice = useMemo(
    () => cartTotal(cart, deliveryPrice, isInFinland, isZone1, isZone2),
    [deliveryPrice]
  );

  useEffect(() => {
    if (totalPrice >= 49 && isInFinland) {
      setIsFreeShipForFinland(true);
    } else if (totalPrice >= 89 && isZone1) {
      setIsFreeShipForZone1(true);
    } else if (totalPrice >= 149 && isZone2) {
      setIsFreeShipForZone2(true);
    }
  }, [totalPrice, isInFinland, isZone1, isZone2, selectedDeliveryType]);

  // Onsubmit handle:
  // const handleSubmit = async () => {
  //   setIsLoading(true)
  //   try {

  //     setIsLoading(false)

  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false)
  //   }
  // };

  return (
    <div id="deliverySection" className="delivery_method">
      <div className="deliveryMethod_container">
        <button
          disabled={true}
          className={`methodButton ${
            selectedDeliveryType === 0 ? "methodButton-active" : ""
          }`}
        >
          {isFreeShipForFinland
            ? "Standard Delivery Inside Finland (1-3 Business Days) 0€."
            : "Standard Delivery Inside Finland (1-3 Business Days) 5.90 €."}
        </button>
        <button
          disabled={true}
          className={`methodButton ${
            selectedDeliveryType === 1 ? "methodButton-active" : ""
          }`}
        >
          {isFreeShipForZone1
            ? "Standard Delivery for Zone 1 (3-5 Business Days) 0€."
            : "Standard Delivery for Zone 1 (3-5 Business Days) 9.90€."}
        </button>
        {/* >>>>>> */}
        <button
          disabled={true}
          className={`methodButton ${
            selectedDeliveryType === 2 ? "methodButton-active" : ""
          }`}
        >
          {isFreeShipForZone2
            ? "Standard Delivery for Zone 2 (4-9 Business Days) 0€."
            : "Standard Delivery for Zone 2 (4-9 Business Days) 19.90€."}
        </button>
        <h2 className="total-price">Subtotal: {totalPrice} €</h2>
      </div>

      <CartHeadingForDeliveryForm />
      <div className="checkout_container">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsLoading(true);
            try {
              const orderId = await handleCartCheckout(
                // navigate,
                cart,
                deliveryPrice,
                shippingInfoForExistUsers,
                shippingInfoForNonUsers,
                setIsNotificationVisible,
                isInFinland,
                isZone1,
                isZone2
              );
              if (orderId) {
                setIsLoading(false);
                navigate(`/payments?orderId=${orderId}`);
              }
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
          }}
        >
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={
                isNonUser()
                  ? shippingInfoForNonUsers.address
                  : shippingInfoForExistUsers.address
              }
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
              value={
                isNonUser()
                  ? shippingInfoForNonUsers.city
                  : shippingInfoForExistUsers.city
              }
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
              value={
                isNonUser()
                  ? shippingInfoForNonUsers.postalCode
                  : shippingInfoForExistUsers.postalCode
              }
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
              value={
                isNonUser()
                  ? shippingInfoForNonUsers.country
                  : shippingInfoForExistUsers.country
              }
              onChange={handleChange}
              required
              // defaultValue={"Finland"}
            >
              {countryData.map((country, index) =>
                Array.isArray(country.label) ? (
                  country.label.map((subCountry, subIndex) => (
                    <option key={`${index}-${subIndex}`} value={subCountry}>
                      {subCountry}
                    </option>
                  ))
                ) : (
                  <option key={index} value={country.value}>
                    {country.label}
                  </option>
                )
              )}
            </select>
          </label>
          <br />
          <label>
            Telephone:
            <input
              type="text"
              name="telephone"
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
          <button
            className={`checkout-button ${isLoading ? "loading-text" : ""}`}
            // className="checkout-button" type="submit"
          >
            {isLoading ? "Loading..." : "Check out"}
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
