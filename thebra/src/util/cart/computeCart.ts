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
    console.log("this is delivert price",deliveryFee)
    console.log("this is in Finland", isInFinland)
    console.log("this is in Zone1", isZone1) 
    console.log("this is in Zone2", isZone2)


  const listOfSize34 = cart.filter( 
    (item: CartProps) => item.productSize[34] > 0
  );

  console.log("this is list34",listOfSize34)

  const listOfSize36 = cart.filter(
    (item: CartProps) => item.productSize[36] > 0
  );

  console.log("this is list36",listOfSize36)

  const total34 = listOfSize34.reduce(
    (total: number, item: CartProps) =>
      total + item.price * item.productSize["34"],
    0
  );
  console.log("this is total 34",total34)
  const total36 = listOfSize36.reduce(
    (total: number, item: CartProps) =>
      total + item.price * item.productSize["36"],
    0
  );
  console.log("this is total 36",total36)

  const totalWithoutShipFee = total34 + total36;
  let total = totalWithoutShipFee;

//   if (totalWithoutShipFee >= 49 && !isInFinland) {
//     total = totalWithoutShipFee;
//   } else if (totalWithoutShipFee >= 89 && isZone1) {
//     total = totalWithoutShipFee;
//   } else if (totalWithoutShipFee >= 149 && isZone2) {
//     total = totalWithoutShipFee;
//   } else {
//     total += deliveryFee;
//   }

  switch (true) {
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
