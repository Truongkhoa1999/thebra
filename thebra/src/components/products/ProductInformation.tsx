// materials
import "./style/ProductInformation.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, RootState } from "../../redux/store";
import { getProductById } from "../../redux/actions/getProductById";
import {
  handleSaveCart,
  handleSaveCartForPanty,
} from "../../util/cart/handleSaveCart";
import {
  handleSize34Confirm,
  handleSize36Confirm,
} from "../../util/sizeSelection/sizeSelection";
import GeneralNotification from "../notification/GeneralNotification";
import { formatNumberWithTwoDecimalPlaces } from "../../util/id/formatID";
import { detectIfPanty } from "../../util/productByCategory/filterProductByCategory";
import { RelevantProductsByCategory } from "./RelevantProductsByCategory";
import { SecureShoppingInformation } from "../secureshoppinginformation/SecureShoppingInformation";
import { ShippingInfo } from "../shippinginfo/ShippingInfo";
import { smoothScroll } from "../../util/window/smoothScroll";

export const ProductInformation = () => {
  const { id } = useParams<{ id: ReturnType<typeof uuidv4> }>();
  const dispatch = useDispatch<AppDispatch>();
  const { productById } = useSelector((state: RootState) => state.productById);
  const { cart } = useSelector((state: RootState) => state.cart);
  const [is34, setIs34] = useState(false);
  const [is36, setIs36] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isPanty, setIsPanty] = useState(false);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
      if (productById) {
        const isSingleItemAPanty = detectIfPanty(productById);
        setIsPanty(isSingleItemAPanty);
      }
    }
  }, [dispatch, currentNumber]);

  const handleSwitchNumber = (designatedNumber: number) => {
    setImageOpacity(0); // Set opacity to 0 to trigger the fade-out effect
    setTimeout(() => {
      smoothScroll("main", true);
      setCurrentNumber(designatedNumber);
      setImageOpacity(1);
    }, 300);
  };

  return (
    <div id="pro_con" className="productInformation_container">
      <div className="upper">
        <div className="productInformation_image">
          <div className="main">
            <img
              id="main"
              src={productById?.images[currentNumber]}
              alt=" "
              style={{ opacity: imageOpacity }}
            />
          </div>
          {productById?.category === "BRA" ||
          productById?.category === "PANTY" ? (
            ""
          ) : (
            <div className="minor">
              {currentNumber == 0 ? (
                <img
                  onClick={() => handleSwitchNumber(1)}
                  src={productById?.images[1]}
                  alt=" "
                />
              ) : (
                <img
                  onClick={() => handleSwitchNumber(0)}
                  src={productById?.images[0]}
                  alt=" "
                />
              )}
              {currentNumber == 2 ? (
                <img
                  onClick={() => handleSwitchNumber(1)}
                  src={productById?.images[1]}
                  alt=" "
                />
              ) : (
                <img
                  onClick={() => handleSwitchNumber(2)}
                  src={productById?.images[2]}
                  alt=" "
                />
              )}
            </div>
          )}
        </div>
        <div className="productInformation_text">
          <div className="buttonSet">
            <h5>The Bra</h5>
            <div className="title">{productById?.title}</div>
            <div className="price">
              {productById
                ? formatNumberWithTwoDecimalPlaces(productById.price)
                : ""}
              €
            </div>
            <h5>Included Tax</h5>
            {productById?.category === "PANTY" ? (
              "Our pants are available in one size fits all."
            ) : (
              <div className="size_group">
                <h4>Size</h4>
                <div>
                  <button
                    className={`sizeSelection ${is34 ? "activated" : ""}`}
                    onClick={() => handleSize34Confirm(is34, setIs34)}
                    disabled={isPanty}
                  >
                    34
                  </button>
                  <button
                    className={`sizeSelection ${is36 ? "activated" : ""}`}
                    onClick={() => handleSize36Confirm(is36, setIs36)}
                    disabled={isPanty}
                  >
                    36
                  </button>
                </div>
              </div>
            )}

            <div className="buttons">
              <button
                onClick={() => {
                  if (
                    productById?.category !== "BRA" &&
                    productById?.category !== "PANTY"
                  ) {
                    if (productById && (is34 || is36)) {
                      handleSaveCart(dispatch, productById, cart, is34, is36);
                      setIsNotificationVisible(true);
                    }
                  } else if (productById?.category === "PANTY") {
                    handleSaveCartForPanty(dispatch, productById, cart, true);

                    setIsNotificationVisible(true);
                  }
                }}
                className="addcart"
              >
                Buy now
              </button>
              <button className="favorite" disabled={true}>
                <FavoriteIcon />
              </button>
            </div>
          </div>
          <div className="textSet">{productById?.description}</div>
          <SecureShoppingInformation />
          <ShippingInfo />
        </div>
      </div>

      <div className="sizeguide">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/thebra-f81ef.appspot.com/o/sizechart.avif?alt=media&token=d917a8d2-db04-4297-b416-51544a4268d4"
          alt=" "
        />
      </div>
      {productById ? (
        <RelevantProductsByCategory category={productById.category} />
      ) : (
        ""
      )}
      {isNotificationVisible ? (
        <GeneralNotification
          notification="Your Item has been added"
          setIsNotificationVisible={setIsNotificationVisible}
          className="signin-notification"
        />
      ) : (
        ""
      )}
    </div>
  );
};
