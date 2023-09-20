import { CartProps } from "../../type/CartProps";

export const detectCartChanges = (
  previousCart: CartProps[],
  currentCart: CartProps[]
) => {
  if (previousCart.length !== currentCart.length) {
    return true; 
  }
  for (let i = 0; i < currentCart.length; i++) {
    const previousItem = previousCart[i];
    const currentItem = currentCart[i];
    if (
      previousItem.cartId !== currentItem.cartId ||
      previousItem.title !== currentItem.title ||
      previousItem.price !== currentItem.price ||
      JSON.stringify(previousItem.productSize) !==
        JSON.stringify(currentItem.productSize)
    ) {
      return true; 
    }
  }
  return false;
};
