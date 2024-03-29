import { decreaseQuantity, increaseQuantity } from "../../redux/actions/cart";
import { CartProps } from "../../type/CartProps";
import { ProductProps } from "../../type/ProductProps";

export const cartTotal = (
  cart: CartProps[],
  deliveryFee: number,
  isInFinland: boolean,
  isZone1: boolean,
  isZone2: boolean
): number => {
  const listOfSize34 = cart.filter(
    (item: CartProps) => item.productSize[34] > 0
  );
  const listOfSize36 = cart.filter(
    (item: CartProps) => item.productSize[36] > 0
  );
  const listOfFreesize = cart.filter((p) => p.productSize["Freesize"] > 0);
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
  const totalFreesize = listOfFreesize.reduce(
    (total: number, item: CartProps) =>
      total + item.productSize["Freesize"] * item.price,
    0
  );
  const totalWithoutShipFee = total34 + total36 + totalFreesize;
  let total = totalWithoutShipFee;

  switch (true) {
    case totalWithoutShipFee === 0:
      total = 0;
      break;
    case totalWithoutShipFee >= 149 && isZone2:
      total = totalWithoutShipFee;
      break;
    case totalWithoutShipFee >= 89 && isZone1:
      total = totalWithoutShipFee;
      break;
    case totalWithoutShipFee >= 49 && isInFinland:
      total = totalWithoutShipFee;
      break;
    default:
      total += deliveryFee;
      break;
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
export const findListOfFreesize = (cart: CartProps[]): CartProps[] => {
  return cart.filter((item: CartProps) => item.productSize["Freesize"] > 0);
};

//Cart add or out handle
export const handleIncreaseQuantityFor34 = (
  products: ProductProps[],
  item: CartProps,
  dispatch: any
) => {
  const product = products.find((p) => p.id === item.cartId);
  if (product && item.productSize["34"] < product.productSize["34"]) {
    dispatch(increaseQuantity(item.cartId, true, false, false));
    localStorage.removeItem("orderId");
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
    dispatch(increaseQuantity(item.cartId, false, true, false));
    localStorage.removeItem("orderId");
    window.location.reload();
  }
};
export const handleDecreaseQuantityFor34 = (item: CartProps, dispatch: any) => {
  if (item.productSize["34"] > 1) {
    dispatch(decreaseQuantity(item.cartId, true, false, false));
    localStorage.removeItem("orderId");
    window.location.reload();
  }
};
export const handleDecreaseQuantityFor36 = (item: CartProps, dispatch: any) => {
  if (item.productSize["36"] > 1) {
    dispatch(decreaseQuantity(item.cartId, false, true, false));
    localStorage.removeItem("orderId");
    window.location.reload();
  }
};
export const handleDecreaseQuantityForFreesize = (
  item: CartProps,
  dispatch: any
) => {
  if (item.productSize["Freesize"] > 1) {
    dispatch(decreaseQuantity(item.cartId, false, false, true));
    localStorage.removeItem("orderId");
    window.location.reload();
  }
};
export const handleIncreaseQuantityForFreesize = (
  products: ProductProps[],
  item: CartProps,
  dispatch: any
) => {
  const product = products.find((p) => p.id === item.cartId);
  if (
    product &&
    item.productSize["Freesize"] < product.productSize["Freesize"]
  ) {
    dispatch(increaseQuantity(item.cartId, false, false, true));
    localStorage.removeItem("orderId");
    window.location.reload();
  }
};
// >>>
interface OrderItemProps {
  id: "string";
  orderId: "string";
  productId: "string";
  quantity: number;
  size: "string";
}
export const findListOfSize34FromOrderItemsBE = (
  orderItems: OrderItemProps[]
) => {
  const size34Items = orderItems.filter((item) => String(item.size) === "34");
  return size34Items;
};
