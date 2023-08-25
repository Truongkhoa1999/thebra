import { decreaseQuantity, increaseQuantity } from "../../redux/actions/cart";
import { CartProps } from "../../type/CartProps";
import { ProductProps } from "../../type/ProductProps";

export const cartTotal = (
  cart: CartProps[],
  deliveryFee: number,
  isOutsideFinland: boolean
): number => {
  const listOfSize34 = cart.filter(
    (item: CartProps) => item.productSize[34] > 0
  );
  const listOfSize36 = cart.filter(
    (item: CartProps) => item.productSize[36] > 0
  );
  const total34 = listOfSize34.reduce(
    (total: number, item: CartProps) =>
      total + item.price * item.productSize["34"],
    0
  );
  const total36 = listOfSize36.reduce(
    (total: number, item: CartProps) =>
      total + item.price * item.productSize["36"],
    0
  );
  const totalWithoutShipFee = total34 + total36;
  let total = totalWithoutShipFee;
  if(totalWithoutShipFee >=49 && !isOutsideFinland){
    total = totalWithoutShipFee
  } else{
    total += deliveryFee
  }
 
  const roundedTotal = parseFloat(total.toFixed(2));
  return roundedTotal;
};

// >>>>>
export const findListOfSize34 = (cart: CartProps[]): CartProps[] => {
  return cart.filter((item: CartProps) => item.productSize[34] > 0);
};
export const findListOfSize36 = (cart: CartProps[]): CartProps[] => {
  return cart.filter((item: CartProps) => item.productSize[36] > 0);
};

//Cart add or out handle
export const handleIncreaseQuantityFor34 = (
  products: ProductProps[],
  item: CartProps,
  dispatch: any
) => {
  const product = products.find((p) => p.id === item.cartId);
  if (product && item.productSize["34"] < product.productSize["34"]) {
    dispatch(increaseQuantity(item.cartId, true, false));
    window.location.reload();
  }
};

export const handleIncreaseQuantityFor36 = (
  products: ProductProps[],
  item: CartProps,
  dispatch: any
) => {
  const product = products.find((p) => p.id === item.cartId);
  if (product && item.productSize["36"] < product.productSize["36"]) {
    dispatch(increaseQuantity(item.cartId, false, true));
    window.location.reload();
  }
};
export const handleDecreaseQuantityFor34 = (item: CartProps, dispatch: any) => {
  if (item.productSize["34"] > 1) {
    dispatch(decreaseQuantity(item.cartId, true, false));
    window.location.reload();
  }
};
export const handleDecreaseQuantityFor36 = (item: CartProps, dispatch: any) => {
  if (item.productSize["36"] > 1) {
    dispatch(decreaseQuantity(item.cartId, false, true));
    window.location.reload();
  }
};
