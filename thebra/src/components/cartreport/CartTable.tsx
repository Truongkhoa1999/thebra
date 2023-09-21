import { useSelector } from "react-redux";
import { deleteCartItem } from "../../redux/actions/cart";
import { AppDispatch, RootState } from "../../redux/store";
import { CartProps } from "../../type/CartProps";
import {
  findListOfFreesize,
  findListOfSize34,
  findListOfSize36,
  handleDecreaseQuantityFor34,
  handleDecreaseQuantityFor36,
  handleDecreaseQuantityForFreesize,
  handleIncreaseQuantityFor34,
  handleIncreaseQuantityFor36,
  handleIncreaseQuantityForFreesize,
} from "../../util/cart/computeCart";
import "./style/cartreport.scss";
import "./style/carttable.scss";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/actions/getProducts";
export const CartTable = ({
  itemImagesFor34,
  itemImagesFor36,
  itemImagesForFreesize,
  dispatch,
}: {
  itemImagesFor34: Record<string, string>;
  itemImagesFor36: Record<string, string>;
  itemImagesForFreesize: Record<string, string>;
  dispatch: AppDispatch;
}) => {
  const { products } = useSelector((state: RootState) => state.products);
  const { cart } = useSelector((state: RootState) => state.cart);

  const [listOfSize34, setListOfSize34] = useState(findListOfSize34(cart));
  const [listOfSize36, setListOfSize36] = useState(findListOfSize36(cart));
  const [listOfFreesize, setListOfFressize] = useState(
    findListOfFreesize(cart)
  );

  const handleRemoveItem = (
    productId: string,
    isSize34: boolean,
    isSize36: boolean,
    isFreesize: boolean
  ) => {
    dispatch(deleteCartItem(productId, isSize34, isSize36, isFreesize));
    setListOfSize34((prevList) =>
      prevList.filter((item) => item.productId !== productId)
    );
    setListOfSize36((prevList) =>
      prevList.filter((item) => item.productId !== productId)
    );
    setListOfFressize((prevList) =>
      prevList.filter((item) => item.productId !== productId)
    );
    localStorage.removeItem("orderId");
    window.location.reload();
  };
  useEffect(() => {
    if (!products) {
      dispatch(fetchProducts());
      console.log(products);
    }
  }, []);
  return (
    <div className="table_container">
      <table>
        <tbody>
          {listOfSize34.map((item: CartProps, index: number) => (
            <tr className="body_tr" key={index}>
              <td className="cart_itemInformation">
                <div className="item_title">
                  {itemImagesFor34[item.productId] && (
                    <img src={itemImagesFor34[item.productId]} alt="" />
                  )}
                  <div className="cart_itemInformation_text">
                    <h5>{item.title}</h5>
                    <h6>
                      Size
                      {item.productSize[34] > 0 && <span>34</span>}
                    </h6>
                  </div>
                </div>
              </td>
              {/* <div className='stock_container'> */}
              <td className="quantity_box">
                <button
                  className={`button ${
                    item.productSize["34"] === 1 ? "disabledButton" : ""
                  }`}
                  disabled={item.productSize["34"] === 1}
                  onClick={() => handleDecreaseQuantityFor34(item, dispatch)}
                >
                  -
                </button>
                <span>{item.productSize["34"]}</span>
                <button
                  disabled={
                    item.productSize["34"] >=
                    products?.find((product) => product.id === item.productId)
                      ?.productSize["34"]
                  }
                  onClick={() =>
                    handleIncreaseQuantityFor34(products, item, dispatch)
                  }
                  className={`button ${
                    item.productSize["34"] >=
                    products?.find((product) => product.id === item.productId)
                      ?.productSize["34"]
                      ? "disabledButton"
                      : ""
                  }`}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  className="closeButton"
                  onClick={() =>
                    handleRemoveItem(item.productId, true, false, false)
                  }
                >
                  Remove
                </button>
              </td>
              <td>{item.price * item.productSize["34"]} €</td>
            </tr>
          ))}
          {listOfSize36.map((item: CartProps, index: number) => (
            <tr className="body_tr" key={index}>
              <td className="cart_itemInformation">
                <div className="item_title">
                  {itemImagesFor36[item.productId] && (
                    <img src={itemImagesFor36[item.productId]} alt="" />
                  )}
                  <div className="cart_itemInformation_text">
                    <h5>{item.title}</h5>
                    <h6>
                      Size
                      {item.productSize[36] > 0 && <span>36</span>}
                    </h6>
                  </div>
                </div>
              </td>
              <td className="quantity_box">
                <button
                  className={`button ${
                    item.productSize["36"] === 1 ? "disabledButton" : ""
                  }`}
                  disabled={item.productSize["36"] === 1}
                  onClick={() => handleDecreaseQuantityFor36(item, dispatch)}
                >
                  -
                </button>
                <span>{item.productSize["36"]}</span>
                <button
                  disabled={
                    item.productSize["36"] >=
                    products?.find((product) => product.id === item.productId)
                      ?.productSize["36"]
                  }
                  onClick={() =>
                    handleIncreaseQuantityFor36(products, item, dispatch)
                  }
                  className={`button ${
                    item.productSize["36"] >=
                    products?.find((product) => product.id === item.productId)
                      ?.productSize["36"]
                      ? "disabledButton"
                      : ""
                  }`}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  className="closeButton"
                  onClick={() =>
                    handleRemoveItem(item.productId, false, true, false)
                  }
                >
                  Remove
                </button>
              </td>
              <td>{item.price * item.productSize["36"]}€</td>
            </tr>
          ))}
          {/* Panty */}
          {listOfFreesize.map((item: CartProps, index: number) => (
            <tr className="body_tr" key={index}>
              <td className="cart_itemInformation">
                <div className="item_title">
                  {itemImagesForFreesize[item.productId] && (
                    <img src={itemImagesForFreesize[item.productId]} alt="" />
                  )}
                  <div className="cart_itemInformation_text">
                    <h5>{item.title}</h5>
                  </div>
                </div>
              </td>
              <td className="quantity_box">
                <button
                  className={`button ${
                    item.productSize["Freesize"] === 1 ? "disabledButton" : ""
                  }`}
                  disabled={item.productSize["Freesize"] === 1}
                  onClick={() =>
                    handleDecreaseQuantityForFreesize(item, dispatch)
                  }
                >
                  -
                </button>
                <span>{item.productSize["Freesize"]}</span>
                <button
                  disabled={
                    item.productSize["Freesize"] >=
                    products?.find((product) => product.id === item.productId)
                      ?.productSize["Freesize"]
                  }
                  onClick={() =>
                    handleIncreaseQuantityForFreesize(products, item, dispatch)
                  }
                  className={`button ${
                    item.productSize["Freesize"] >=
                    products?.find((product) => product.id === item.productId)
                      ?.productSize["Freesize"]
                      ? "disabledButton"
                      : ""
                  }`}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  className="closeButton"
                  onClick={() =>
                    handleRemoveItem(item.productId, false, false, true)
                  }
                >
                  Remove
                </button>
              </td>
              <td>{item.price * item.productSize["Freesize"]}€</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr></tr>
        </tfoot>
      </table>
    </div>
  );
};
